import { useRef } from 'react';
import { useClickOutside } from '../../../hooks';

import './Dropdown.scss';
import './DropdownTheme.scss';

const Dropdown = ({
  items,
  isActive,
  setIsActive,
  togglerSelector = '',
  className = '',
}) => {
  const dropdownOutsideRef = useRef(null);
  useClickOutside(dropdownOutsideRef, (event) => {
    const isToggler = togglerSelector
      ? event.target.closest(togglerSelector)
      : false;
    !isToggler && setIsActive(false);
  });

  const handleClick = (item) => {
    setIsActive(false);
    item.callback?.();
  };

  return (
    <div
      className={`dropdown is-popup ${className} ${
        isActive ? 'is-active' : ''
      }`}
      ref={dropdownOutsideRef}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className="dropdown__item"
          onClick={() => handleClick(item)}
        >
          {item.content ?? (
            <>
              {item.icon && <img src={item.icon} />}
              <p>{item.name}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
