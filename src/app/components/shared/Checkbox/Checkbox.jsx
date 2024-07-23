import { useContext } from 'react';
import { ThemeContext } from '../../../App';

import checkIcon from '../../../assets/img/icons/check-w.svg';
import checkIconDark from '../../../assets/img/icons/check-black.svg';

import './Checkbox.scss';

const Checkbox = ({ isActive = false }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`checkbox ${isActive ? 'is-active' : ''}`}>
      <div className="checkbox__field">
        <img src={theme === 'light' ? checkIcon : checkIconDark} />
      </div>
    </div>
  );
};

export default Checkbox;
