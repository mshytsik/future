import { useContext } from 'react';
import { ThemeContext } from '../../App';

import checkIcon from '../../assets/img/icons/check-thin.svg';
import checkIconDark from '../../assets/img/icons/theme/check-thin.svg';

import './Steps.scss';
import './StepsTheme.scss';

const Steps = ({ items, activeItem = 1 }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="steps">
      {items.map((item, index) => (
        <div
          key={index}
          className={`step ${
            index + 1 < activeItem
              ? 'is-passed'
              : index + 1 === activeItem
                ? 'is-active'
                : ''
          }`}
        >
          <div className="step__icon">
            {index + 1 >= activeItem ? (
              <p>{index + 1}</p>
            ) : (
              <img src={theme === 'light' ? checkIcon : checkIconDark} />
            )}
          </div>

          <div className="step__body">
            <p className="step__title">
              {item.title ? item.title : `Step ${index + 1}`}
            </p>
            {item.subtitle && <p className="step__subtitle">{item.subtitle}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
