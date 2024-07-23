import { useState, useEffect, useContext, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ThemeContext } from '../../../../App';
import { errorHandler } from '../../../../utils/utils';
import { loadImageFile } from '../../../../utils/image';

import EditorInput from '../../EditorInput/EditorInput';
import { Button } from '../../../shared';

import plusIcon from '../../../../assets/img/icons/plus-w.svg';
import plusIconDark from '../../../../assets/img/icons/theme/plus-w.svg';
import imageIcon from '../../../../assets/img/icons/image-grey.svg';

import './ImageBlock.scss';
import './ImageBlockTheme.scss';

const ImageBlock = ({
  data,
  name,
  mode,
  isPreview,
  setBlocks,
  className = '',
  shouldValidate,
}) => {
  const MAX_SIZE_MB = 10;

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      [`${name}-image`]: data.image,
      [`${name}-label`]: data.label,
    },
  });

  const onSubmit = (formData) => {
    setBlocks((blocks) =>
      blocks.map((item) =>
        item.id === data.id
          ? {
              ...item,
              valid: true,
              image: formData[`${name}-image`],
              label: formData[`${name}-label`].trim(),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (shouldValidate) {
      clearErrors();
      handleSubmit(onSubmit, (errors) => {
        errorHandler(errors);
      })();
    }
  }, [shouldValidate]);

  const inputRef = useRef(null);

  const clearInput = () => {
    setImageValue('');
    inputRef.current.value = '';
  };

  const handleChange = (e) =>
    loadImageFile(
      e,
      (imageSrc) => setImageValue(imageSrc),
      () => clearInput(),
      MAX_SIZE_MB
    );

  const [imageValue, setImageValue] = useState(data.image);

  useEffect(() => {
    setValue(`${name}-image`, imageValue, { shouldValidate: false });
    imageValue &&
      handleSubmit(onSubmit, (errors) => {
        errorHandler(errors);
      })();
  }, [imageValue]);

  const theme = useContext(ThemeContext);

  const hideImageForm = isPreview || (data.image && data.label);

  return (
    <div className={`block-image ${className}`}>
      {mode === 'edit' && !hideImageForm && (
        <div className="editor-block__form block-image__form image-form">
          <div className={`image-form__image ${data.image ? 'has-image' : ''}`}>
            {data.image ? (
              <img src={data.image} />
            ) : (
              <>
                <img className="image-form__icon" src={imageIcon} />

                <p className="image-form__text">
                  Acceptable formats: JPEG, PNG.
                  <br />
                  Maximum file size: {MAX_SIZE_MB} MB.
                </p>

                <Button
                  isLabelFor={`${name}-image`}
                  title="Add an image"
                  icon={{
                    iconSrc: theme === 'light' ? plusIcon : plusIconDark,
                  }}
                  type="primary"
                  size="md"
                >
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={`${name}-image`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="file"
                        className="editor-block__input"
                        id={`${name}-image`}
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png"
                        value={data.value}
                        hidden
                        ref={(element) => {
                          field.ref(element);
                          inputRef.current = element;
                        }}
                      />
                    )}
                  />
                </Button>

                {errors[`${name}-image`] && (
                  <p className="image-form__text is-error">No image added.</p>
                )}
              </>
            )}
          </div>

          <div className="image-form__label">
            <EditorInput
              control={control}
              getValues={getValues}
              setValue={setValue}
              name={`${name}-label`}
              type="text"
              placeholder="Add a label"
              required={false}
              error={errors[`${name}-label`]}
              onSubmit={handleSubmit(onSubmit, (errors) =>
                errorHandler(errors)
              )}
            />
          </div>
        </div>
      )}

      {(mode === 'view' || (mode === 'edit' && hideImageForm)) && (
        <div className="block-image__result">
          <img src={data.image} />

          {data.label && <p>{data.label}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
