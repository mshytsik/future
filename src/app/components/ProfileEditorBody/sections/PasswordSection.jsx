import { FormInput } from '../../form';

const PasswordSection = ({ user, control, getValues, setValue, errors }) => {
  const validate = {
    passwordOld: (value) => {
      if (value === '' && getValues('passwordNew1') !== '') {
        return 'Old password is not entered.';
      } else if (value.length !== 0 && value !== user.password) {
        return 'Wrong old password.';
      } else {
        return true;
      }
    },
    passwordNew1: (value) =>
      value === '' && getValues('passwordOld') !== ''
        ? 'New password is not entered.'
        : true,
  };

  return (
    <>
      <FormInput
        control={control}
        value={getValues('passwordOld')}
        setValue={setValue}
        name="passwordOld"
        label="Old password"
        type="password"
        error={errors.passwordOld}
        validate={{
          passwordOld: validate.passwordOld,
        }}
      />

      <FormInput
        control={control}
        value={getValues('passwordNew1')}
        setValue={setValue}
        name="passwordNew1"
        label="New password"
        type="password"
        error={errors.passwordNew1}
        validate={{
          passwordNew1: validate.passwordNew1,
        }}
      />

      <FormInput
        control={control}
        value={getValues('passwordNew2')}
        setValue={setValue}
        name="passwordNew2"
        label="Repeat new password"
        type="password"
        equalTo="passwordNew1"
        getValues={getValues}
        error={errors.passwordNew2}
      />
    </>
  );
};

export default PasswordSection;
