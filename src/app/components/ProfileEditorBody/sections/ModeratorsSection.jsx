import { useDispatch } from 'react-redux';
import { show } from '../../../store/reducers/popupReducer';

import { FormTabs } from '../../form';
import { Button } from '../../shared';

const ModeratorsSection = ({ user, control, getValues, setValue, errors }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  return (
    <>
      <FormTabs
        control={control}
        value={getValues('type')}
        setValue={setValue}
        name="type"
        options={[
          { name: 'Person', value: 'person' },
          { name: 'Company', value: 'company' },
        ]}
        label="User type"
        error={errors.type}
      />

      <FormTabs
        control={control}
        value={getValues('isVerified')}
        setValue={setValue}
        name="isVerified"
        options={[
          { name: 'Yes', value: 'true' },
          { name: 'No', value: 'false' },
        ]}
        label="Verified"
        error={errors.isVerified}
      />

      <FormTabs
        control={control}
        value={getValues('isModerator')}
        setValue={setValue}
        name="isModerator"
        options={[
          { name: 'Yes', value: 'true' },
          { name: 'No', value: 'false' },
        ]}
        label="Moderator"
        error={errors.isModerator}
      />

      {user.type === 'company' && (
        <Button
          callback={() => dispatchShowPopup('employees')}
          title="Team members"
          type="primary"
          size="md"
          isFullWidth
          isSquare
        />
      )}
    </>
  );
};

export default ModeratorsSection;
