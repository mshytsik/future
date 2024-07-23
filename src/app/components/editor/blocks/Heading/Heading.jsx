import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { errorHandler } from '../../../../utils/utils';

import EditorInput from '../../EditorInput/EditorInput';

import './Heading.scss';
import './HeadingTheme.scss';

const Heading = ({ data, name, setBlocks, className = '', shouldValidate }) => {
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      [name]: data.value,
    },
  });

  const onSubmit = (formData) => {
    setBlocks((blocks) =>
      blocks.map((item) =>
        item.id === data.id
          ? { ...item, valid: true, value: formData[name].trim() }
          : item
      )
    );
  };

  useEffect(() => {
    !data.value && setFocus(name);
  }, []);

  useEffect(() => {
    if (shouldValidate) {
      clearErrors();
      handleSubmit(onSubmit, (errors) => errorHandler(errors))();
    }
  }, [shouldValidate]);

  return (
    <div className={`block-heading block-heading--${data.size} ${className}`}>
      {data.value ? (
        <>
          {data.size === 'h2' && (
            <h2 className="block-heading__result" id={name}>
              {data.value}
            </h2>
          )}

          {data.size === 'h3' && (
            <h3 className="block-heading__result">{data.value}</h3>
          )}

          {data.size === 'h4' && (
            <h4 className="block-heading__result">{data.value}</h4>
          )}
        </>
      ) : (
        <div className="editor-block__form block-heading__form">
          <EditorInput
            control={control}
            getValues={getValues}
            setValue={setValue}
            name={name}
            type="text"
            placeholder="Insert heading"
            error={
              errors[name] ||
              (shouldValidate &&
                !data.valid && { message: 'Heading is not added.' })
            }
            onSubmit={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
