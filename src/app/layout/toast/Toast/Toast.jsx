import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../../../store/reducers/toastsReducer';

import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../components/shared';

import infoIcon from '../../../assets/img/icons/info.svg';
import successIcon from '../../../assets/img/icons/success.svg';
import warningIcon from '../../../assets/img/icons/warning.svg';
import closeIcon from '../../../assets/img/icons/close.svg';

import './Toast.scss';

const TOAST_LIFETIME = 10;

const Toast = ({
  id,
  type = 'info',
  title = '',
  message = '',
  buttons = [],
}) => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), TOAST_LIFETIME * 1000);
  }, []);

  const removeToast = () => setTimeout(() => dispatch(remove(id)), 300);

  return (
    <CSSTransition
      in={showToast}
      nodeRef={nodeRef}
      classNames="is"
      timeout={{ exit: 100 }}
      onExited={removeToast}
    >
      <div className="toast" ref={nodeRef}>
        <div className="toast__content">
          <div className="toast__icon">
            {type === 'info' && <img src={infoIcon} />}
            {type === 'success' && <img src={successIcon} />}
            {type === 'warning' && <img src={warningIcon} />}
          </div>

          <div className="toast__body">
            {title && <p className="toast__title">{title}</p>}

            {message && <p className="toast__message">{message}</p>}

            {buttons && (
              <div className="toast__buttons">
                {buttons.map((button) => (
                  <p
                    key={button.name}
                    onClick={() => {
                      button.callback?.();
                      setShowToast(false);
                    }}
                    className="toast__button"
                  >
                    {button.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <Button
            callback={() => setShowToast(false)}
            icon={{
              iconSrc: closeIcon,
              iconOnly: true,
              iconSize: 'xs',
              useSVG: true,
            }}
            className="toast__close"
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default Toast;
