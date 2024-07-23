import { FormInput } from '../../form';

const ContactsSection = ({ control, getValues, setValue, errors }) => {
  return (
    <>
      <FormInput
        control={control}
        value={getValues('contactEmail')}
        setValue={setValue}
        name="contactEmail"
        label="Displayed email"
        type="email"
        placeholder="example@gmail.com"
        error={errors.contactEmail}
      />

      <FormInput
        control={control}
        value={getValues('website')}
        setValue={setValue}
        name="website"
        label="Website"
        type="url"
        placeholder="https://example.com"
        error={errors.website}
      />

      <FormInput
        control={control}
        value={getValues('phone')}
        setValue={setValue}
        name="phone"
        label="Phone"
        type="tel"
        placeholder="Phone number"
        error={errors.phone}
      />

      <FormInput
        control={control}
        value={getValues('telegram')}
        setValue={setValue}
        name="telegram"
        label="Telegram"
        type="url"
        placeholder="Telegram"
        error={errors.telegram}
      />

      <FormInput
        control={control}
        value={getValues('twitter')}
        setValue={setValue}
        name="twitter"
        label="Twitter"
        type="url"
        placeholder="Twitter"
        error={errors.twitter}
      />

      <FormInput
        control={control}
        value={getValues('facebook')}
        setValue={setValue}
        name="facebook"
        label="Facebook"
        type="url"
        placeholder="Facebook"
        error={errors.facebook}
      />

      <FormInput
        control={control}
        value={getValues('linkedin')}
        setValue={setValue}
        name="linkedin"
        label="LinkedIn"
        type="url"
        placeholder="LinkedIn"
        error={errors.linkedin}
      />
    </>
  );
};

export default ContactsSection;
