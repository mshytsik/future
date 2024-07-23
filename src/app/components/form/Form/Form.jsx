import './Form.scss';
import './FormTheme.scss';

const Form = ({
  children,
  footer = null,
  onSubmit = null,
  error = '',
  bodyWrap = true,
  bodyId = '',
  bodyRef = null,
  className = '',
}) => {
  return (
    <form
      className={`form ${className}`}
      autoComplete="off"
      noValidate="novalidate"
      onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}
    >
      {bodyWrap ? (
        <div className="form__body" ref={bodyRef} id={bodyId ? bodyId : null}>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}

      {error && <p className="form__response error">{error}</p>}

      {footer}
    </form>
  );
};

export default Form;
