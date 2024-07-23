import { FormInput } from '../../form';

const AboutSection = ({ user, control, getValues, setValue, errors }) => {
  return (
    <>
      <FormInput
        control={control}
        value={getValues('area')}
        setValue={setValue}
        name="area"
        label={user.type === 'company' ? 'Industry' : 'Specialization'}
        type="text"
        placeholder="Media, technology, etc."
        error={errors.area}
      />

      <FormInput
        control={control}
        value={getValues('location')}
        setValue={setValue}
        name="location"
        label="Location"
        type="text"
        placeholder={
          user.type === 'company'
            ? 'Where is the company is registered'
            : 'Location'
        }
        error={errors.location}
      />

      {user.type === 'company' && (
        <>
          <FormInput
            control={control}
            value={getValues('employees')}
            setValue={setValue}
            name="employees"
            label="Employees"
            type="text"
            placeholder="How many people are there on staff"
            error={errors.employees}
          />

          <FormInput
            control={control}
            value={getValues('birthday')}
            setValue={setValue}
            name="birthday"
            label="Foundation date"
            type="date"
            placeholder="Foundation date"
            error={errors.birthday}
          />
        </>
      )}

      <FormInput
        control={control}
        value={getValues('descriptionFull')}
        setValue={setValue}
        name="descriptionFull"
        label="Description"
        type="textarea"
        placeholder={`Short${
          user.type === 'company' ? ' company' : ''
        } description`}
        maxLength={500}
        error={errors.descriptionFull}
      />
    </>
  );
};

export default AboutSection;
