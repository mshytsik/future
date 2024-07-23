import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { hide } from '../../../store/reducers/popupReducer';
import { selectUsers, login, edit } from '../../../store/reducers/usersReducer';
import { errorHandler } from '../../../utils/utils';

import Popup from '../Popup/Popup';
import { Form, FormInput } from '../../../components/form';
import { Button } from '../../../components/shared';

const PopupNewPassword = ({ isActive, email }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const [formError, setFormError] = useState('');

  const defaultValues = {
    value1: '',
    value2: '',
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
      reset(defaultValues);
      setFormError('');
    }
  }, [isActive]);

  const onSubmit = (data) => {
    const userId = users.find((user) => user.email === email)?.id;

    setFormError(userId ? '' : `User for ${email} is not found.`);

    if (userId) {
      dispatch(
        edit({
          id: userId,
          password: data.value1,
        })
      );

      dispatch(login(userId));
      dispatch(hide());
    }
  };

  const title = 'New password';
  const subtitle = (
    <>
      Enter your new password below
      <br />
      and log in again
    </>
  );

  const formFooter = (
    <div className="popup__nav">
      <Button
        callback={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        title="Confirm"
        type="primary"
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
        error={formError}
      >
        <FormInput
          control={control}
          value={getValues('value1')}
          setValue={setValue}
          name="value1"
          label="Your password"
          type="password"
          required={true}
          error={errors.value1}
        />

        <FormInput
          control={control}
          value={getValues('value2')}
          setValue={setValue}
          name="value2"
          label="Repeat your pasword"
          type="password"
          required={true}
          equalTo="value1"
          getValues={getValues}
          error={errors.value2}
        />
      </Form>
    </Popup>
  );
};

export default PopupNewPassword;
