import { useState, useContext, useRef } from 'react';
import { ThemeContext } from '../../../App';
import useClickOutside from '../../../hooks/useClickOutside';

import Button from '../Button/Button';
import { ReactSVG } from 'react-svg';

import checkmark from '../../../assets/img/icons/check.svg';
import chevron from '../../../assets/img/icons/chevron-d.svg';
import chevronDark from '../../../assets/img/icons/theme/chevron-d.svg';

import './Select.scss';
import './SelectTheme.scss';

const Select = ({ options, value, setOptionValue, className = '' }) => {
  const theme = useContext(ThemeContext);

  const [showOptions, setShowOptions] = useState(false);
  const outsideRef = useRef(null);
  useClickOutside(outsideRef, () => setShowOptions(false));

  const handleSelectOption = (selectedValue) => {
    setShowOptions(false);
    setOptionValue(selectedValue);
  };

  return (
    <div
      className={`select ${className} ${showOptions ? 'is-active' : ''}`}
      ref={outsideRef}
    >
      <Button
        callback={() => setShowOptions((isOpened) => !isOpened)}
        title={options.find((option) => option.id === value).name}
        icon={{ iconSrc: theme === 'light' ? chevron : chevronDark }}
        size="md"
        type="secondary"
        className="select__button"
      />

      <div
        className={`select__body is-popup ${showOptions ? 'is-active' : ''}`}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className={`select__item ${
              option.id === value ? 'is-selected' : ''
            }`}
            onClick={() => handleSelectOption(option.id)}
          >
            <p>{option.name}</p>
            {option.id === value && <ReactSVG src={checkmark} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
