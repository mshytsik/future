import { useContext } from 'react';
import { ThemeContext } from '../../App';

import { Button } from '../shared';

import plusIcon from '../../assets/img/icons/plus-w.svg';
import plusIconDark from '../../assets/img/icons/plus-grey.svg';

import './EmptyGridBlock.scss';
import './EmptyGridBlockTheme.scss';

const EmptyGridBlock = ({ title, subtitle, callback, className }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`empty-block ${className}`}>
      <p className="empty-block__title">{title}</p>
      <p className="empty-block__subtitle">{subtitle}</p>

      <Button
        callback={callback}
        title="Add"
        icon={{
          iconSrc: theme === 'light' ? plusIcon : plusIconDark,
        }}
        type="primary"
        size="md"
        className="empty-block__button"
      />
    </div>
  );
};

export default EmptyGridBlock;
