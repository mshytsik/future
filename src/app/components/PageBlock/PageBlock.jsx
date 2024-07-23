import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';

import { Button } from '../shared';

import chevron from '../../assets/img/icons/chevron-d.svg';
import chevronDark from '../../assets/img/icons/theme/chevron-d.svg';

import './PageBlock.scss';
import './PageBlockTheme.scss';

const PageBlock = ({ title, buttonLink = '', children, className = '' }) => {
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();

  return (
    <div className={`page-block ${className}`}>
      <div className="page-block__head">
        <p className="page-block__title">{title}</p>

        {buttonLink && (
          <Button
            callback={() => navigate(buttonLink)}
            title="See all"
            type="secondary"
            size="md"
            icon={{ iconSrc: theme === 'light' ? chevron : chevronDark }}
            className="hide-xs"
          >
            {<img src={theme === 'light' ? chevron : chevronDark} />}
          </Button>
        )}
      </div>

      {children}

      {buttonLink && (
        <Button
          callback={() => navigate(buttonLink)}
          title="See all"
          type="secondary"
          icon={{ iconSrc: theme === 'light' ? chevron : chevronDark }}
          isFullWidth={true}
          className="hide-md hide-sm"
        >
          {<img src={theme === 'light' ? chevron : chevronDark} />}
        </Button>
      )}
    </div>
  );
};

export default PageBlock;
