import { getRandomColorName } from '../../utils/random';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

import './Titlearea.scss';
import './TitleareaTheme.scss';

const Titlearea = ({ breadcrumbs = [], title, isHash = false }) => {
  return (
    <div className="titlearea">
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

      <div className="titlearea__main">
        <div className={`titlearea__icon color--${getRandomColorName()}`}>
          <p>{isHash ? '#' : title[0]}</p>
        </div>

        <p className="titlearea__title">{title}</p>
      </div>
    </div>
  );
};

export default Titlearea;
