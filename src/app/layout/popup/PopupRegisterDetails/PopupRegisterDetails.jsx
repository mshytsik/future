import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { show, hide } from '../../../store/reducers/popupReducer';
import {
  selectUsers,
  login,
  register,
} from '../../../store/reducers/usersReducer';
import { populateUser } from '../../../utils/populate';
import { setDate } from '../../../utils/dateTime';
import { getNewId, errorHandler } from '../../../utils/utils';

import Popup from '../Popup/Popup';
import { Form, FormInput } from '../../../components/form';
import { Button } from '../../../components/shared';

const PopupRegisterDetails = ({ isActive, email }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const users = useSelector(selectUsers);

  const defaultValues = {
    username: '',
    name: '',
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

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [isActive]);

  const onSubmit = (data) => {
    const userId = getNewId(users);

    const registerDate = setDate(Date.now());

    dispatch(
      register({
        ...populateUser(),
        id: userId,
        nickname: data.username,
        username: data.name,
        email: email,
        password: data.password,
        registerDate: registerDate,
      })
    );

    dispatch(login(userId));
    dispatch(hide());
  };

  const title = 'Welcome 👋';
  const subtitle =
    'To complete the creation of your account, we only need a few details. You can always change them later.';

  const formFooter = (
    <div className="popup__nav popup__nav--column">
      <Button
        callback={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        title="Continue"
        type="primary"
        isFullWidth
      />

      <Button
        callback={() => dispatchShowPopup('register')}
        title="Login another way"
        type="secondary"
        isFullWidth
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
      >
        <FormInput
          control={control}
          value={getValues('username')}
          setValue={setValue}
          name="username"
          label="Username"
          type="text"
          placeholder="Your unique @username"
          required={true}
          error={errors.username}
        />

        <FormInput
          control={control}
          value={getValues('name')}
          setValue={setValue}
          name="name"
          label="Displayed first and last name"
          type="text"
          placeholder="Your profile name"
          required={true}
          error={errors.name}
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

export default PopupRegisterDetails;
