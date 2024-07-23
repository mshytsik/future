import { useContext } from 'react';
import { ThemeContext } from '../../../App';

import { Button } from '../../shared';
import { FormInput } from '../../form';

import plusIcon from '../../../assets/img/icons/plus-w.svg';
import plusIconDark from '../../../assets/img/icons/theme/plus-w.svg';

import './EditorInput.scss';

const EditorInput = ({
  control,
  getValues,
  setValue,
  name,
  type = 'text',
  placeholder = 'Insert title',
  required = true,
  validate = {},
  error,
  onSubmit,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="editor-block__input editor-input">
      <div className="editor-input__input">
        <FormInput
          control={control}
          value={getValues(name)}
          setValue={setValue}
          name={name}
          labelBlock={false}
          type={type}
          placeholder={placeholder}
          required={required}
          validate={validate}
          error={error}
          handleSubmit={onSubmit}
          submitOnEnter
        />
      </div>

      <div className="editor-input__nav">
        <Button
          callback={onSubmit}
          title="Add"
          icon={{
            iconSrc: theme === 'light' ? plusIcon : plusIconDark,
          }}
          type="primary"
          size="md"
        />
      </div>
    </div>
  );
};

export default EditorInput;
