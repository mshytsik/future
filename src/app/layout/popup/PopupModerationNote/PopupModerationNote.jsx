import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { hide } from '../../../store/reducers/popupReducer';
import { edit } from '../../../store/reducers/articlesReducer';
import { errorHandler } from '../../../utils/utils';

import Popup from '../Popup/Popup';
import { Form, FormInput } from '../../../components/form';
import { Button } from '../../../components/shared';

const PopupModerationNote = ({ isActive, article }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [isActive]);

  const defaultValues = { moderation: '' };

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: false, defaultValues });

  const onSubmit = (data) => {
    dispatch(
      edit({
        id: article.id,
        status: 'rejected',
        moderationNote: data.moderation,
      })
    );
    dispatch(hide());
  };

  const title = 'Reason for rejection';
  const subtitle = article
    ? `Indicate the problem for which the author's ${
        article.type === 'post' ? 'post' : 'event'
      } will not be published.`
    : '';

  const formFooter = (
    <div className="popup__nav">
      <Button callback={() => dispatch(hide)} title="Back" type="secondary" />

      <Button
        callback={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
        title="Save"
        type="primary"
      />
    </div>
  );

  return (
    <Popup
      isActive={isActive}
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
          value={getValues('moderation')}
          setValue={setValue}
          name="moderation"
          type="textarea"
          placeholder="Violation of portal policy, etc..."
          required={true}
          error={errors.moderation}
        />
      </Form>
    </Popup>
  );
};

export default PopupModerationNote;
