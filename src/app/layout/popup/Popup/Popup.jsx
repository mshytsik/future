import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { hide } from '../../../store/reducers/popupReducer';
import { ThemeContext } from '../../../App';

import { Button } from '../../../components/shared';

import closeIcon from '../../../assets/img/icons/close.svg';
import closeIconDark from '../../../assets/img/icons/theme/close.svg';

import './Popup.scss';
import './PopupTheme.scss';

const Popup = ({
  isActive = false,
  size = '',
  head: { title = '', subtitle = '', headContent = null } = {},
  children,
  footer = null,
  className = '',
  contentClassName = '',
  useBodyWrap = true,
}) => {
  const dispatch = useDispatch();
  const dispatchHide = () => dispatch(hide());

  const theme = useContext(ThemeContext);

  return (
    <div
      className={`popup is-popup ${size ? `popup--${size}` : ''} ${className} ${
        isActive ? 'is-active' : ''
      }`}
    >
      <div className="popup__overlay" onClick={dispatchHide}></div>

      <div className={`popup__content ${contentClassName}`}>
        {(title || subtitle) && (
          <div className="popup__head">
            <Button
              callback={dispatchHide}
              icon={{
                iconSrc: theme === 'light' ? closeIcon : closeIconDark,
                iconOnly: true,
                iconSize: 'sm',
              }}
              className="popup__close"
            />
            {title && <p className="popup__title">{title}</p>}
            {subtitle && <p className="popup__subtitle">{subtitle}</p>}
            {headContent}
          </div>
        )}

        {useBodyWrap ? <div className="popup__body">{children}</div> : children}

        {footer && <div className="popup__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Popup;
