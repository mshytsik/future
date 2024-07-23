import { useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTerms,
  selectArticles,
} from '../../../store/reducers/articlesReducer';
import { selectCurrentUser } from '../../../store/reducers/usersReducer';
import { show } from '../../../store/reducers/popupReducer';
import { sortTerms } from '../../../utils/sort';
import { useOnResize } from '../../../hooks';

import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Button, Tag } from '../../../components/shared';
import { ThemeContext } from '../../../App';

import logo from '../../../assets/img/icons/logo.svg';
import logoDark from '../../../assets/img/icons/theme/logo.svg';
import cog from '../../../assets/img/icons/cog.svg';
import chevron from '../../../assets/img/icons/chevron-r-fill.svg';
import chevronDark from '../../../assets/img/icons/theme/chevron-r-fill.svg';

import './MainNav.scss';
import './MainNavTheme.scss';

const MainNav = () => {
  const currentUser = useSelector(selectCurrentUser);

  const theme = useContext(ThemeContext);

  const categories = useSelector(selectTerms('post', 'categories')).filter(
    (category) => category.slug !== 'knowledge-base'
  );

  const bookmarks =
    currentUser && currentUser.bookmarks.length
      ? currentUser.bookmarks
          .filter((bookmark) => bookmark.active)
          .map((bookmark) =>
            categories.find((category) => category.id === bookmark.id)
          )
      : categories;

  const articles = useSelector(selectArticles);
  const tags = useSelector(selectTerms('post', 'tags'));
  const popularTags = [...tags]
    .sort((a, b) => sortTerms(a, b, 'post', 'tags', articles))
    .slice(0, 6);

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const [expandMenu, setExpandMenu] = useState(false);
  const [showToggle, setShowToggle] = useState(true);

  const navRef = useRef(null);
  const trackRef = useRef(null);

  const handleExpand = () => setExpandMenu((expandValue) => !expandValue);
  const handleResize = () =>
    setShowToggle(trackRef.current.offsetWidth < trackRef.current.scrollWidth);

  useOnResize(handleResize);

  return (
    <CSSTransition
      in={expandMenu}
      nodeRef={navRef}
      timeout={{
        appear: 1000,
      }}
      classNames="is"
    >
      <div className={`main__nav main-nav`} ref={navRef}>
        <Link className="main-nav__logo hide-xl hide-lg hide-md" to="/">
          <img src={theme === 'light' ? logo : logoDark} />
        </Link>

        <div className="main-nav__track hide-scroll" ref={trackRef}>
          {bookmarks.map((bookmark) => (
            <Tag
              key={bookmark.id}
              tag={{ type: 'post', ...bookmark }}
              type="category"
            />
          ))}

          {popularTags.slice(0, 10).map((tag) => (
            <Tag key={tag.id} tag={{ type: 'post', ...tag, isHash: true }} />
          ))}

          {showToggle && (
            <div
              className="main-nav__item main-nav__item--toggle hide-sm hide-xs"
              onClick={handleExpand}
            >
              <img src={theme === 'light' ? chevron : chevronDark} />
              <p className="is-active">Collapse</p>
            </div>
          )}
        </div>

        <div className="main-nav__menu">
          {showToggle && (
            <div
              className="main-nav__item main-nav__item--toggle"
              onClick={handleExpand}
            >
              <p className="is-inactive">Expand</p>
              <p className="is-active">Collapse</p>
              <img src={theme === 'light' ? chevron : chevronDark} />
            </div>
          )}

          {currentUser && (
            <Button
              callback={() => dispatchShowPopup('bookmarks')}
              icon={{
                iconSrc: cog,
                iconSize: 'md',
              }}
              title="Customize"
              className="main-nav__item main-nav__item--button button--icon button--icon-md"
            />
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

export default MainNav;
