import { useSelector } from 'react-redux';
import { selectUsers } from '../../../store/reducers/usersReducer';

import { FormPhoto, FormInput } from '../../form';

const GeneralSection = ({ user, control, getValues, setValue, errors }) => {
  const users = useSelector(selectUsers);

  const validate = {
    nickname: (value) =>
      value !== user.nickname && users.find((item) => item.nickname === value)
        ? 'This username already exists.'
        : true,
    email: (value) =>
      value !== user.email && users.find((item) => item.email === value)
        ? 'This Email already exists.'
        : true,
  };

  return (
    <>
      <FormPhoto setValue={setValue} name="photo" value={user.photo} />

      <FormInput
        control={control}
        value={getValues('nickname')}
        setValue={setValue}
        name="nickname"
        label="Username*"
        type="text"
        placeholder="Username"
        required
        error={errors.nickname}
        validate={{ uniqueNickname: validate.nickname }}
      />

      <FormInput
        control={control}
        value={getValues('username')}
        setValue={setValue}
        name="username"
        label={
          user.type === 'company' ? 'Company name*' : 'First and Last Name*'
        }
        type="text"
        placeholder={
          user.type === 'company' ? 'Company name' : 'First and Last Name'
        }
        required
        error={errors.username}
      />

      <FormInput
        control={control}
        value={getValues('descriptionShort')}
        setValue={setValue}
        name="descriptionShort"
        label="Short description"
        type="text"
        placeholder={`A few words about ${
          user.type === 'company' ? 'the company' : 'yourself'
        }`}
        maxLength={50}
        error={errors.descriptionShort}
      />

      <FormInput
        control={control}
        value={getValues('email')}
        setValue={setValue}
        name="email"
        label="Email*"
        type="email"
        placeholder="Email"
        required
        error={errors.email}
        validate={{ uniqueEmail: validate.email }}
      />
    </>
  );
};

export default GeneralSection;
