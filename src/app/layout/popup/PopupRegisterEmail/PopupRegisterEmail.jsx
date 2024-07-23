import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { show } from '../../../store/reducers/popupReducer';
import { errorHandler } from '../../../utils/utils';

import Popup from '../Popup/Popup';
import { Form, FormInput } from '../../../components/form';
import { Button } from '../../../components/shared';

const PopupRegisterEmail = ({ isActive, setEmail }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

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
    }
  }, [isActive]);

  const onSubmit = (data) => {
    setEmail(data.email);
    dispatchShowPopup('register-note');
  };

  const title = (
    <>
      Continue
      <br />
      via email
    </>
  );
  const subtitle =
    'Enter your email and we will send you a link to log in to the platform';

  const formFooter = (
    <div className="popup__nav">
      <Button
        callback={() => dispatchShowPopup('register')}
        title="Back"
        type="secondary"
      />

      <Button
        callback={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        title="Continue"
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

export default PopupRegisterEmail;
