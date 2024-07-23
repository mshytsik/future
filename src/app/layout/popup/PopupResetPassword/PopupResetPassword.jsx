import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectUsers } from '../../../store/reducers/usersReducer';
import { show } from '../../../store/reducers/popupReducer';
import { errorHandler } from '../../../utils/utils';

import { Form, FormInput } from '../../../components/form';
import Popup from '../Popup/Popup';
import { Button } from '../../../components/shared';

const PopupResetPassword = ({ isActive, setEmail }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const [resetError, setResetError] = useState('');

  const users = useSelector(selectUsers);

  const defaultValues = { email: '' };

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: false, defaultValues });

  useEffect(() => {
    if (!isActive) {
      reset();
      setResetError('');
    }
  }, [isActive]);

  const onSubmit = (data) => {
    const userWithEmail = users.find((user) => user.email === data.email);

    if (userWithEmail) {
      setEmail(data.email);
      dispatch(show('reset-password-note'));
    }

    setResetError(userWithEmail ? '' : "This email doesn't exist.");
  };

  const title = 'Restore password';
  const subtitle =
    'Enter your email and we will send you a link to reset your password';

  const formFooter = (
    <div className="popup__nav popup__nav--no-padding">
      <Button
        callback={() => dispatchShowPopup('login')}
        title="Back"
        type="secondary"
      />

      <Button
        callback={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        title="Send"
        type="primary"
      />
    </div>
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
      <Form
        footer={formFooter}
        onSubmit={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        error={resetError}
      >
        <FormInput
          control={control}
          value={getValues('email')}
          setValue={setValue}
          name="email"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          required={true}
          error={errors.email}
        />
      </Form>
    </Popup>
  );
};

export default PopupResetPassword;
