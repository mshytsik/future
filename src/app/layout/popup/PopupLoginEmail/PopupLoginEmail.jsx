import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { show, hide } from '../../../store/reducers/popupReducer';
import { selectUsers, login } from '../../../store/reducers/usersReducer';
import { errorHandler } from '../../../utils/utils';

import Popup from '../Popup/Popup';
import { Form, FormInput } from '../../../components/form';
import { Button } from '../../../components/shared';

const PopupLoginEmail = ({ isActive }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (!isActive) {
      reset();
      setLoginError('');
    }
  }, [isActive]);

  const users = useSelector(selectUsers);

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: false, defaultValues });

  const onSubmit = (data) => {
    const loginUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (loginUser) {
      dispatch(login(loginUser.id));
      dispatch(hide());
    }

    setLoginError(loginUser ? '' : 'User is not found.');
  };

  const title = 'Login via email';
  const subtitle = (
    <>
      Enter your email and password to log in to the platform. If you can&apos;t
      log in, you can{' '}
      <span
        onClick={() => dispatchShowPopup('reset-password')}
        className="is-link"
      >
        reset your password here
      </span>
    </>
  );

  const formFooter = (
    <div className="popup__nav">
      <Button
        callback={() => dispatchShowPopup('login')}
        title="Back"
        type="secondary"
      />

      <Button
        callback={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        title="Login"
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
        error={loginError}
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

        <FormInput
          control={control}
          value={getValues('password')}
          setValue={setValue}
          name="password"
          label="Password"
          type="password"
          required={true}
          error={errors.password}
        />
      </Form>
    </Popup>
  );
};

export default PopupLoginEmail;
