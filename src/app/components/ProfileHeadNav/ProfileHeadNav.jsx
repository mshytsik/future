import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { show } from '../../store/reducers/popupReducer';
import { selectCurrentUser } from '../../store/reducers/usersReducer';
import { ThemeContext } from '../../App';
import { useSubscribe } from '../../hooks';

import { Button } from '../shared';

import './ProfileHeadNav.scss';
import './ProfileHeadNavTheme.scss';

import mailIcon from '../../assets/img/icons/mail-w.svg';
import mailIconDark from '../../assets/img/icons/theme/mail-w.svg';
import editIcon from '../../assets/img/icons/edit.svg';
import editIconDark from '../../assets/img/icons/theme/edit.svg';

const ProfileHeadNav = ({ user }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const theme = useContext(ThemeContext);

  const currentUser = useSelector(selectCurrentUser);

  const isSubscribed = currentUser
    ? currentUser.subscriptions.some(
        (subscription) => subscription.userId === user.id
      )
    : false;
  const handleSubscribe = useSubscribe(currentUser, user, isSubscribed);

  return (
    <div className="profile-head__nav head-nav">
      {currentUser?.id === user.id ? (
        <Button
          callback={() => dispatchShowPopup('profile-editor')}
          title="Edit"
          type="secondary"
        />
      ) : (
        <>
          <div className="head-nav__icon-buttons">
            {currentUser?.isModerator && (
              <Button
                callback={() => dispatchShowPopup('profile-editor')}
                icon={{
                  iconSrc: theme === 'light' ? editIcon : editIconDark,
                  iconOnly: true,
                  iconSize: 'lg',
                }}
                type="secondary"
              />
            )}

            {user.contacts.email && (
              <Button
                callback={() =>
                  window.open(`mailto:${user.contacts.email}`, '_blank')
                }
                icon={{
                  iconSrc: theme === 'light' ? mailIcon : mailIconDark,
                  iconOnly: true,
                  iconSize: 'lg',
                }}
                type="secondary"
              />
            )}
          </div>

          <Button
            callback={() =>
              currentUser ? handleSubscribe() : dispatchShowPopup('login')
            }
            title={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            type="primary"
            className={isSubscribed ? 'is-active' : ''}
          />
        </>
      )}
    </div>
  );
};

export default ProfileHeadNav;
