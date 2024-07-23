import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/shared';

import './HeaderMenuItem.scss';
import './HeaderMenuItemTheme.scss';

const HeaderMenuItem = ({
  name,
  link = '',
  callback = null,
  icon,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div className={`header-menu__item menu-item ${className}`}>
      <Button
        callback={callback ? callback : () => navigate(link)}
        title={name}
        icon={{ iconSrc: icon, iconOnly: true, useSVG: true }}
      />
    </div>
  );
};

export default HeaderMenuItem;
