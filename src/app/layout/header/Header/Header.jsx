import { useState, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  logout,
} from '../../../store/reducers/usersReducer';
import { show } from '../../../store/reducers/popupReducer';
import useClickOutside from '../../../hooks/useClickOutside';

import { Button, User } from '../../../components/shared';
import HeaderMenuItem from '../HeaderMenuItem/HeaderMenuItem';
import HeaderAccount from '../HeaderAccount/HeaderAccount';
import { ThemeContext } from '../../../App';

import logo from '../../../assets/img/icons/logo.svg';
import logoDark from '../../../assets/img/icons/theme/logo.svg';
import iconPosts from '../../../assets/img/icons/posts.svg';
import iconEvents from '../../../assets/img/icons/events.svg';
import iconKnowledge from '../../../assets/img/icons/knowledge.svg';
import iconSearch from '../../../assets/img/icons/search.svg';
import iconAdd from '../../../assets/img/icons/add.svg';
import iconLogin from '../../../assets/img/icons/login.svg';
import toggle from '../../../assets/img/icons/toggle.svg';
import toggleDark from '../../../assets/img/icons/theme/toggle.svg';

import './Header.scss';
import './HeaderTheme.scss';

const Header = ({ setTheme }) => {
  const [mobileActive, setMobileActive] = useState(false);

  const headerOutsideRef = useRef(null);

  useClickOutside(headerOutsideRef, (event) => {
    const isToggler = event.target.closest('.header-toggler');
    !isToggler && setMobileActive(false);
  });

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useContext(ThemeContext);

  const handleToggleClick = () =>
    setMobileActive((mobileActive) => !mobileActive);

  let currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const dispatchLogout = () => dispatch(logout());
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const handleAccountClick = () => {
    if (currentUser) {
      dispatchLogout();
      location.pathname !== '/' && navigate('/');
    } else {
      dispatchShowPopup('login');
    }
  };

  return (
    <>
      <header
        className={`header is-logged-${currentUser ? 'in' : 'out'} ${
          mobileActive ? 'is-active' : ''
        }`}
        ref={headerOutsideRef}
      >
        <div className="header__content">
          <Link to="/" className="header__logo hide-sm hide-xs">
            <img src={theme === 'light' ? logo : logoDark} />
          </Link>

          {currentUser && (
            <User
              user={currentUser}
              title={currentUser.username}
              subtitle={currentUser.email}
              callback={() => {
                setMobileActive(false);
                navigate(`/author/${currentUser.nickname}`);
              }}
              verifyNearTitle
              className="header-user user--link hide-xl hide-lg hide-md"
            />
          )}

          <div className="header__menu header-menu">
            <HeaderMenuItem
              name="Posts"
              link="/"
              icon={iconPosts}
              className={location.pathname === '/' ? 'is-active' : ''}
            />

            <HeaderMenuItem
              name="Events"
              link="/conferences"
              icon={iconEvents}
              className={
                location.pathname === '/conferences' ? 'is-active' : ''
              }
            />

            <HeaderMenuItem
              name="Knowledge base"
              link="/posts/category/knowledge-base"
              icon={iconKnowledge}
              className={
                location.pathname === '/posts/category/knowledge-base'
                  ? 'is-active'
                  : ''
              }
            />

            <HeaderMenuItem
              name="Search"
              callback={() => dispatchShowPopup('search')}
              icon={iconSearch}
              className={location.pathname === '/search' ? 'is-active' : ''}
            />

            {currentUser && (
              <HeaderMenuItem
                name="Add post/event"
                callback={() => dispatchShowPopup('buttons')}
                icon={iconAdd}
                className="menu-item--add hide-sm hide-xs"
              />
            )}

            <HeaderMenuItem
              name={currentUser ? 'Logout' : 'Login'}
              callback={handleAccountClick}
              icon={iconLogin}
              className="hide-xl hide-lg hide-md"
            />
          </div>

          <HeaderAccount
            user={currentUser}
            theme={theme}
            setTheme={setTheme}
            loginCallback={handleAccountClick}
          />

          <Button
            callback={() =>
              dispatchShowPopup(currentUser ? 'buttons' : 'register')
            }
            title={currentUser ? 'Add post/event' : 'Create account'}
            type="secondary"
            isFullWidth={true}
            className="header__button hide-xl hide-lg hide-md"
          />
        </div>
      </header>

      <Button
        callback={handleToggleClick}
        icon={{
          iconSrc: theme === 'light' ? toggle : toggleDark,
          iconOnly: true,
        }}
        type="secondary"
        className="header-toggler hide-xl hide-lg hide-md"
      />
    </>
  );
};

export default Header;
