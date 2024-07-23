import { useState, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { useOnResize } from '../../../hooks';

import { Button } from '../../shared';

import warningIcon from '../../../assets/img/icons/warning.svg';
import clearIcon from '../../../assets/img/icons/clear.svg';
import eyeOnIcon from '../../../assets/img/icons/eye.svg';
import eyeOffIcon from '../../../assets/img/icons/eye-off.svg';
import searchIcon from '../../../assets/img/icons/search-empty.svg';

import './FormInput.scss';
import './FormInputTheme.scss';

const FormInput = ({
  control,
  value,
  setValue,
  name,
  label = '',
  labelBlock = true,
  note = '',
  type,
  placeholder = '',
  required = false,
  maxLength = null,
  minLength = null,
  max = null,
  min = null,
  equalTo = false,
  getValues = null,
  disabled = false,
  error = null,
  validate = {},
  isSearch = false,
  handleSubmit = null,
  submitOnEnter = false,
  onChangeCallback = null,
}) => {
  const rules = {
    required: required,
    maxLength: maxLength ? { value: maxLength } : null,
    minLength: minLength ? { value: minLength } : null,
    validate: validate,
  };

  switch (type) {
    case 'email':
      rules.validate.email = (value) =>
        value.length === 0 ||
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? true
          : 'Please enter a valid email address.';
      break;
    case 'url':
      rules.validate.url = (value) =>
        value.length === 0 ||
        /^(http(s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/i.test(
          value
        )
          ? true
          : 'Please enter a valid URL.';
      break;
    case 'date':
      rules.validate.date = (value) => {
        const dateObject = new Date(value);
        return (
          !isNaN(dateObject) &&
          dateObject >= new Date('1900-01-01') &&
          dateObject <= new Date('2200-01-01')
        );
      };
      break;
    case 'number':
      rules.validate.max = (value) => (max && value ? value <= max : true);
      rules.validate.min = (value) => (min && value ? value >= min : true);
      break;
  }

  if (equalTo) {
    rules.validate.equalTo = (value) =>
      value === getValues(equalTo)
        ? true
        : 'Please enter the same value again.';
  }

  const errorMessages = {
    required: 'This field is required.',
    date: 'Please enter a valid date.',
    maxLength: `Please enter no more than ${maxLength} characters.`,
    minLength: `Please enter at least ${minLength} characters.`,
    max: `Please enter a value of no more than ${max}.`,
    min: `Please enter a value of at least ${min}.`,
  };

  const textareaRef = useRef(null);

  const handleResizeTextarea = () => {
    if (type === 'textarea') {
      textareaRef.current.style.height = 'auto';
      if (inputValue) {
        const newHeight =
          textareaRef.current.scrollHeight +
          textareaRef.current.offsetHeight -
          textareaRef.current.clientHeight;
        textareaRef.current.style.height = `${newHeight}px`;
      }
    }
  };

  useOnResize(handleResizeTextarea);

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setShowClear(inputValue?.length > 0);
    setValue(name, inputValue, { shouldValidate: false });
    !inputValue?.length && setShowValue(false);
    handleResizeTextarea();
    onChangeCallback?.();
  }, [inputValue]);

  const [showClear, setShowClear] = useState(inputValue?.length > 0);
  const [showValue, setShowValue] = useState(type !== 'password');
  const passwordType = showValue ? 'text' : 'password';

  const handleInput = (value) => setInputValue(value);

  const handleClearInput = () => setInputValue('');

  const handleEyeClick = () => setShowValue((prev) => !prev);

  const inputContent = (
    <>
      <div className="form__input form-input">
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field }) =>
            type === 'textarea' ? (
              <textarea
                {...field}
                className={`form-input__input form-input__input--textarea${
                  error ? ' is-error' : ''
                } ${disabled ? ' is-disabled' : ''}`}
                placeholder={placeholder}
                onInput={(e) => handleInput(e.target.value)}
                onPaste={(e) => handleInput(e.target.value)}
                ref={(element) => {
                  field.ref(element);
                  textareaRef.current = element;
                }}
                tabIndex={disabled ? -1 : null}
              />
            ) : (
              <input
                {...field}
                type={type === 'password' ? passwordType : type}
                className={`form-input__input${error ? ' is-error' : ''}${
                  disabled ? ' is-disabled' : ''
                }`}
                placeholder={type === 'password' ? '••••••••••••' : placeholder}
                onInput={(e) => handleInput(e.target.value)}
                onPaste={(e) => handleInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && submitOnEnter && handleSubmit()
                }
                tabIndex={disabled ? -1 : null}
              />
            )
          }
        />

        <div className="form-input__nav input-nav">
          <div className="input-nav__content">
            {error && (
              <div className="input-nav__warning">
                <img src={warningIcon} />
              </div>
            )}

            {!disabled && (
              <>
                {showClear && (
                  <Button
                    callback={handleClearInput}
                    icon={{
                      iconSrc: clearIcon,
                      iconOnly: true,
                      iconSize: 'sm',
                    }}
                  />
                )}

                {type === 'password' && (
                  <Button
                    callback={handleEyeClick}
                    icon={{
                      iconSrc: showValue ? eyeOffIcon : eyeOnIcon,
                      iconOnly: true,
                      iconSize: 'sm',
                    }}
                  />
                )}

                {isSearch && (
                  <Button
                    callback={handleSubmit}
                    icon={{
                      iconSrc: searchIcon,
                      iconOnly: true,
                      iconSize: 'sm',
                    }}
                    className="input-nav__submit"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <label className="form__error is-error">
          {error.type in errorMessages
            ? errorMessages[error.type]
            : error.message}
        </label>
      )}

      {note && <p className="form__note">{note}</p>}
    </>
  );

  return labelBlock ? (
    <div className="form__block">
      {(label || maxLength) && (
        <div className="form__block-head">
          {label && <label className="form__label">{label}</label>}

          {maxLength && (
            <p className="form__counter">
              {inputValue.length}/{maxLength}
            </p>
          )}
        </div>
      )}

      {inputContent}
    </div>
  ) : (
    inputContent
  );
};

export default FormInput;
