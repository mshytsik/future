import { useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { errorHandler } from '../../../../utils/utils';

import EditorInput from '../../EditorInput/EditorInput';

import './Code.scss';
import './CodeTheme.scss';

const Code = ({ data, name, setBlocks, className = '', shouldValidate }) => {
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
    <div className={`block-code ${className}`}>
      {data.value ? (
        <code className="block-code__result">
          {data.value.split(/\r\n|\r|\n/g).map((line, index) => (
            <Fragment key={index}>
              {index !== 0 && <br />}
              {line}
            </Fragment>
          ))}
        </code>
      ) : (
        <div className="editor-block__form block-code__form">
          <EditorInput
            control={control}
            getValues={getValues}
            setValue={setValue}
            name={name}
            type="textarea"
            placeholder="Insert code"
            error={
              errors[name] ||
              (shouldValidate &&
                !data.valid && { message: 'Code is not added.' })
            }
            onSubmit={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
          />
        </div>
      )}
    </div>
  );
};

export default Code;
