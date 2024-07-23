import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { show, hide } from '../../../store/reducers/popupReducer';

import Popup from '../Popup/Popup';
import { Button } from '../../../components/shared';

const PopupResetPasswordNote = ({ isActive, email }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  useEffect(() => {
    if (isActive) {
      setTimeout(() => dispatchShowPopup('new-password'), 3000);
    }
  }, [isActive]);

  const title = 'Check your email';
  const subtitle = (
    <>
      Open the link sent to your email <strong>{email}</strong> to log in and
      change your password.
    </>
  );

  return (
    <Popup
      isActive={isActive}
      size="sm"
      head={{
        title,
        subtitle,
      }}
    >
      <div className="popup__nav">
        <Button
          callback={() => dispatchShowPopup('reset-password')}
          title="Back"
          type="secondary"
        />

        <Button
          callback={() => dispatch(hide())}
          title="Close"
          type="primary"
        />
      </div>
    </Popup>
  );
};

export default PopupResetPasswordNote;
