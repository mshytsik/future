import { useState, useEffect, useContext, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { ThemeContext } from '../../../App';
import useClickOutside from '../../../hooks/useClickOutside';

import { Button } from '../../shared';
import { ReactSVG } from 'react-svg';

import checkmark from '../../../assets/img/icons/check.svg';
import chevron from '../../../assets/img/icons/chevron-d.svg';
import chevronDark from '../../../assets/img/icons/theme/chevron-d.svg';

import '../../shared/Select/Select.scss';
import '../FormInput/FormInput.scss';
import './FormSelect.scss';

const FormSelect = ({
  control,
  value,
  setValue,
  name,
  options,
  label = '',
  labelBlock = true,
  error = null,
}) => {
  const theme = useContext(ThemeContext);

  const [showOptions, setShowOptions] = useState(false);
  const outsideRef = useRef(null);
  useClickOutside(outsideRef, () => setShowOptions(false));

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSelectOption = (selectedValue) => {
    setShowOptions(false);
    setInputValue(selectedValue);
    setValue(name, selectedValue, { shouldValidate: false });
  };

  const selectedOption = options.find((option) => option.value === inputValue);

  const inputContent = (
    <>
      <div
        className={`form__input form-input form-input--select select ${
          showOptions ? 'is-active' : ''
        }`}
        ref={outsideRef}
      >
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input {...field} type="text" value={selectedOption.value} hidden />
          )}
        />

        <Button
          callback={() => setShowOptions((isOpened) => !isOpened)}
          title={selectedOption.name}
          className="form-input__input select__button"
        >
          <div className="form-input__nav input-nav">
            <div className="input-nav__content">
              <img src={theme === 'light' ? chevron : chevronDark} />
            </div>
          </div>
        </Button>

        <div
          className={`select__body is-popup ${showOptions ? 'is-active' : ''}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`select__item ${
                option.value === inputValue ? 'is-selected' : ''
              }`}
              onClick={() => handleSelectOption(option.value)}
            >
              <p>{option.name}</p>
              {option.value === inputValue && <ReactSVG src={checkmark} />}
            </div>
          ))}
        </div>
      </div>

      {error && <label className="form__error is-error">{error.message}</label>}
    </>
  );

  return labelBlock ? (
    <div className="form__block">
      {label && (
        <div className="form__block-head">
          <label className="form__label">{label}</label>
        </div>
      )}

      {inputContent}
    </div>
  ) : (
    inputContent
  );
};

export default FormSelect;
