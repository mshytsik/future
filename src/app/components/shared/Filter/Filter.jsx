import Checkbox from '../Checkbox/Checkbox';

import './Filter.scss';
import './FilterTheme.scss';

const Filter = ({ title, options, setOptions, className = '' }) => {
  const handleClickOption = (value) => {
    setOptions((activeOptions) =>
      activeOptions.includes(value)
        ? activeOptions.filter((option) => option !== value)
        : [...activeOptions, value]
    );
  };

  return (
    <div className={`filter ${className}`}>
      <p className="filter__title">{title}</p>

      <div className="filter__list">
        {options.map((option) => (
          <div
            key={option.value}
            className="filter__item"
            onClick={() => handleClickOption(option.value)}
          >
            <p>{option.name}</p>
            <Checkbox isActive={option.isActive} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
