import { useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/reducers/usersReducer';
import { edit } from '../../store/reducers/articlesReducer';
import { show } from '../../store/reducers/popupReducer';
import { ThemeContext } from '../../App';
import {
  useArticleFavorite,
  useArticleShare,
  useArticleLike,
  useClickOutside,
} from '../../hooks';

import { Button } from '../shared';

import more from '../../assets/img/icons/more.svg';
import share from '../../assets/img/icons/share.svg';
import favorite from '../../assets/img/icons/favorite.svg';
import favoriteOn from '../../assets/img/icons/favorite-on.svg';
import favoriteOnDark from '../../assets/img/icons/theme/favorite-on.svg';
import heart from '../../assets/img/icons/heart.svg';
import heartOn from '../../assets/img/icons/heart-on.svg';
import heartOnDark from '../../assets/img/icons/theme/heart-on.svg';
import editIcon from '../../assets/img/icons/edit-grey.svg';
import editIconDark from '../../assets/img/icons/edit-light.svg';
import publishIcon from '../../assets/img/icons/publish.svg';
import unpublishIcon from '../../assets/img/icons/unpublish.svg';

import './ArticleNav.scss';
import './ArticleNavTheme.scss';

const ArticleNav = ({ article, isHidden, className = '' }) => {
  const theme = useContext(ThemeContext);

  const [openNav, setOpenNav] = useState(false);

  const popupOutsideRef = useRef(null);
  useClickOutside(popupOutsideRef, (e) => {
    const isToggle = Array.from(e.target.classList).includes(
      'article-nav__toggle'
    );
    !isToggle && setOpenNav(false);
  });

  const user = useSelector(selectCurrentUser);

  const isFavorite = user ? user.favorite.includes(article.id) : false;
  const handleFavorite = useArticleFavorite(article, user, isFavorite);

  const handleShare = useArticleShare(article);

  const hasLike = user
    ? article.stats.liked.some((liked) => liked.userId === user.id)
    : false;
  const handleLike = useArticleLike(article, user, hasLike);

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const navigate = useNavigate();

  const location = useLocation();

  const handlePublish = () =>
    dispatch(edit({ id: article.id, status: 'publish' }));

  const handleUnpublish = () =>
    dispatchShowPopup({ id: 'moderation-note', data: article });

  return (
    <div
      className={`article-nav ${className} ${isHidden ? 'is-hidden' : ''} ${
        openNav ? 'is-active' : ''
      }`}
      onClick={(e) => e.preventDefault()}
    >
      {isHidden && (
        <Button
          callback={() => setOpenNav((isActive) => !isActive)}
          icon={{
            iconSrc: more,
            iconSize: 'sm',
            iconOnly: true,
          }}
          className="article-nav__toggle"
        />
      )}

      <div className="article-nav__body is-popup" ref={popupOutsideRef}>
        {location.pathname === `/author/${user?.nickname}` && (
          <>
            {user.id === article.author && article.status !== 'pending' && (
              <ArticleNavButton
                callback={() => {
                  setTimeout(() => {
                    document
                      .querySelector('.main-body__content')
                      .scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);

                  navigate(`/${article.type}/${article.id}/edit/`);
                }}
                icon={theme === 'light' ? editIcon : editIconDark}
                name="Edit"
              />
            )}

            {user.isModerator && article.status === 'pending' && (
              <>
                <ArticleNavButton
                  callback={handlePublish}
                  icon={publishIcon}
                  name="Publish"
                />

                <ArticleNavButton
                  callback={handleUnpublish}
                  icon={unpublishIcon}
                  name="Reject"
                />
              </>
            )}
          </>
        )}

        {article.status === 'publish' && (
          <>
            <ArticleNavButton
              callback={() =>
                user ? handleFavorite() : dispatchShowPopup('login')
              }
              icon={
                isFavorite
                  ? theme === 'light'
                    ? favoriteOn
                    : favoriteOnDark
                  : favorite
              }
              name={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
            />

            <ArticleNavButton
              callback={handleShare}
              icon={share}
              name={'Share'}
            />

            <ArticleNavButton
              callback={() =>
                user ? handleLike() : dispatchShowPopup('login')
              }
              icon={
                hasLike ? (theme === 'light' ? heartOn : heartOnDark) : heart
              }
              name={`${hasLike ? 'Add' : 'Remove'} like`}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ArticleNavButton = ({ name, icon, callback }) => {
  return (
    <div className="article-nav__button" onClick={callback}>
      <div className="article-nav__button-content">
        <img src={icon} />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default ArticleNav;
