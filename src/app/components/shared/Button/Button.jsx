import { ReactSVG } from 'react-svg';

import './Button.scss';
import './ButtonTheme.scss';

const Button = ({
  callback = null,
  title = '',
  icon: {
    iconSrc = null,
    iconOnly = false,
    iconSize = null,
    useSVG = false,
  } = {},
  type = null,
  size = null,
  isFullWidth = false,
  isSquare = false,
  isLabelFor = '',
  className = '',
  children = null,
}) => {
  let classes = `button ${className}`;
  type && (classes += ` button--${type}`);
  size && (classes += ` button--${size}`);
  isSquare && (classes += ` button--square`);
  isFullWidth && (classes += ` button--fw`);
  iconOnly && iconSrc && (classes += ' button--icon');
  iconOnly && iconSize && (classes += ` button--icon-${iconSize}`);

  const buttonBody = (
    <>
      {iconSrc && (useSVG ? <ReactSVG src={iconSrc} /> : <img src={iconSrc} />)}
      {title && <p className="button__title">{title}</p>}
      {children}
    </>
  );

  return isLabelFor ? (
    <label className={classes} htmlFor={isLabelFor}>
      {buttonBody}
    </label>
  ) : (
    <div className={classes} onClick={callback}>
      {buttonBody}
    </div>
  );
};

export default Button;
