import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { show } from '../../../store/reducers/popupReducer';
import useClickOutside from '../../../hooks/useClickOutside';

import { Toggle, User } from '../../../components/shared';

import emailIcon from '../../../assets/img/icons/email.svg';
import tgIcon from '../../../assets/img/icons/tg.svg';
import fbIcon from '../../../assets/img/icons/fb.svg';
import igIcon from '../../../assets/img/icons/ig.svg';
import vkIcon from '../../../assets/img/icons/vk.svg';
import ttIcon from '../../../assets/img/icons/tt.svg';

import './HeaderAccount.scss';
import './HeaderAccountTheme.scss';

import company from '../../../data/company';

const HeaderAccount = ({ user, theme, setTheme, loginCallback }) => {
  const [showAccount, setShowAccount] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setShowAccount(false);
  }, [location.pathname]);

  const popupOutsideRef = useRef(null);
  useClickOutside(popupOutsideRef, (event) => {
    const isAvatar = event.target.closest('.header-account__avatar');
    !isAvatar && setShowAccount(false);
  });

  const navigate = useNavigate();

  const handleLoginClick = () => {
    !user && setShowAccount(false);
    loginCallback();
  };

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const handleOpenBookmarks = () => {
    setShowAccount(false);
    dispatchShowPopup('bookmarks');
  };

  const SOCIAL_ICONS = {
    telegram: tgIcon,
    facebook: fbIcon,
    instagram: igIcon,
    vkontakte: vkIcon,
    tiktok: ttIcon,
  };

  return (
    <div className="header__account header-account">
      <User
        user={user}
        title={user?.username}
        subtitle={user?.email}
        photoOnly
        callback={() => setShowAccount((showAccount) => !showAccount)}
        className="header-account__avatar user--link hide-sm hide-xs"
      />

      <div
        className={`header-account__menu account-menu is-popup ${
          showAccount ? 'is-active' : ''
        }`}
        ref={popupOutsideRef}
      >
        {user && (
          <div className="account-menu__header account-header hide-sm hide-xs">
            <User
              user={user}
              title={user.username}
              subtitle={user.email}
              callback={() => {
                setShowAccount(false);
                navigate(`/author/${user.nickname}`);
              }}
              verifyNearTitle
              className="header-user user--link"
            />
          </div>
        )}

        <div className="account-menu__body">
          <Toggle
            name="Dark theme"
            value={theme === 'dark'}
            className="account-menu__item"
            callback={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          {user && (
            <p onClick={handleOpenBookmarks} className="account-menu__item">
              Settings
            </p>
          )}
          <Link to="/author/shytsik" className="account-menu__item">
            About us
          </Link>
          <Link to="#" className="account-menu__item">
            Terms of use
          </Link>
          <Link to="#" className="account-menu__item">
            Privacy Policy
          </Link>
        </div>

        <div className="account-menu__socials hide-sm hide-xs">
          <Link to={`mailto:${company.email.default}`} target="_blank">
            <img src={emailIcon} />
          </Link>

          {Object.entries(company.socials).map(
            ([name, link]) =>
              name !== 'linkedin' && (
                <Link key={name} to={link} target="_blank">
                  <img src={SOCIAL_ICONS[name]} />
                </Link>
              )
          )}
        </div>

        <div className="account-menu__footer hide-sm hide-xs">
          <p className="account-menu__item" onClick={handleLoginClick}>
            {user ? 'Logout' : 'Login'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderAccount;
