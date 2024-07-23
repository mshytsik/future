import { useState } from 'react';

import './Toggle.scss';
import './ToggleTheme.scss';

const Toggle = ({
  name,
  value = false,
  callback = null,
  labelFirst = true,
  className = '',
}) => {
  const [active, setActive] = useState(value);

  const handleClick = () => {
    setActive((active) => !active);
    callback();
  };

  return (
    <div
      className={`toggle ${className} ${active ? ' is-active' : ''}`}
      onClick={handleClick}
    >
      {!labelFirst && <div className="toggle__input"></div>}

      {name && <p className="toggle__label">{name}</p>}

      {labelFirst && <div className="toggle__input"></div>}
    </div>
  );
};

export default Toggle;
