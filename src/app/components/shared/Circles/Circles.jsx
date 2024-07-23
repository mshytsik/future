import { getRandomColorName } from '../../../utils/random';

import './Circles.scss';
import './CirclesTheme.scss';

const Circles = ({ items = [] }) => {
  return (
    <div className="circles">
      {items.map((item, index) => (
        <div
          key={index}
          className={`circles__item color--${getRandomColorName()}`}
        >
          <p>{item}</p>
        </div>
      ))}

      <div className="circles__item circles__item--more">
        <span></span>
        <span></span>
        <span></span>
        <p>?</p>
      </div>
    </div>
  );
};

export default Circles;
