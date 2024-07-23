import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/reducers/usersReducer';

import PopupLogin from '../PopupLogin/PopupLogin';
import PopupLoginEmail from '../PopupLoginEmail/PopupLoginEmail';
import PopupRegister from '../PopupRegister/PopupRegister';
import PopupRegisterEmail from '../PopupRegisterEmail/PopupRegisterEmail';
import PopupRegisterNote from '../PopupRegisterNote/PopupRegisterNote';
import PopupRegisterDetails from '../PopupRegisterDetails/PopupRegisterDetails';
import PopupResetPassword from '../PopupResetPassword/PopupResetPassword';
import PopupResetPasswordNote from '../PopupResetPasswordNote/PopupResetPasswordNote';
import PopupNewPassword from '../PopupNewPassword/PopupNewPassword';
import PopupBookmarks from '../PopupBookmarks/PopupBookmarks';
import PopupButtons from '../PopupButtons/PopupButtons';
import PopupSearch from '../PopupSearch/PopupSearch';
import PopupModerationNote from '../PopupModerationNote/PopupModerationNote';

const PopupList = ({ active: { id: activeId, data = null }, search }) => {
  const currentUser = useSelector(selectCurrentUser);

  const [email, setEmail] = useState('');

  return (
    <>
      <PopupSearch isActive={activeId === 'search'} search={search} />

      {currentUser ? (
        <>
          <PopupButtons isActive={activeId === 'buttons'} />
          <PopupBookmarks isActive={activeId === 'bookmarks'} />

          {currentUser.isModerator && (
            <PopupModerationNote
              isActive={activeId === 'moderation-note'}
              article={data}
            />
          )}
        </>
      ) : (
        <>
          <PopupLogin isActive={activeId === 'login'} />
          <PopupLoginEmail isActive={activeId === 'login-email'} />

          <PopupRegister isActive={activeId === 'register'} />
          <PopupRegisterEmail
            isActive={activeId === 'register-email'}
            setEmail={setEmail}
          />
          <PopupRegisterNote
            isActive={activeId === 'register-note'}
            email={email}
          />
          <PopupRegisterDetails
            isActive={activeId === 'register-details'}
            email={email}
          />

          <PopupResetPassword
            isActive={activeId === 'reset-password'}
            setEmail={setEmail}
          />
          <PopupResetPasswordNote
            isActive={activeId === 'reset-password-note'}
            email={email}
          />
          <PopupNewPassword
            isActive={activeId === 'new-password'}
            email={email}
          />
        </>
      )}
    </>
  );
};

export default PopupList;
