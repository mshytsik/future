import { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../../../App';
import { loadImageFile } from '../../../utils/image';

import { Button } from '../../shared';

import accountIcon from '../../../assets/img/icons/account.svg';
import trashIcon from '../../../assets/img/icons/trash.svg';
import trashIconDark from '../../../assets/img/icons/theme/trash.svg';

import './FormPhoto.scss';
import './FormPhotoTheme.scss';

const FormPhoto = ({ setValue, name, maxSizeMb = 10, value = '' }) => {
  const [photoValue, setPhotoValue] = useState(value);
  const [showClear, setShowClear] = useState(value.length > 0);

  const inputRef = useRef(null);

  const theme = useContext(ThemeContext);

  const handleClearInput = () => {
    setValue(name, '', { shouldValidate: false });
    setPhotoValue('');
    setShowClear(false);
    inputRef.current.value = '';
  };

  const handleChange = (e) =>
    loadImageFile(
      e,
      (imageSrc) => {
        setValue(name, imageSrc, { shouldValidate: false });
        setPhotoValue(imageSrc);
        setShowClear(true);
      },
      () => handleClearInput(),
      maxSizeMb
    );

  return (
    <div className="form__input form-photo">
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        accept=".jpg,.jpeg,.png"
        hidden
        ref={inputRef}
      />

      <label htmlFor={name} className="form-photo__image">
        <img
          src={photoValue ? photoValue : accountIcon}
          className={photoValue ? '' : 'is-unknown'}
        />
      </label>

      <div className="form-photo__body">
        <div className="form-photo__nav">
          <Button
            isLabelFor={name}
            title="Upload a photo"
            type="secondary"
            size="md"
          />

          {showClear && (
            <Button
              callback={handleClearInput}
              icon={{
                iconSrc: theme === 'light' ? trashIcon : trashIconDark,
                iconOnly: true,
                iconSize: 'md',
              }}
              type="secondary"
            />
          )}
        </div>

        <p className="form-photo__hint">
          Acceptable formats: JPEG, PNG.
          <br />
          Maximum file size: {maxSizeMb} MB.
        </p>
      </div>
    </div>
  );
};

export default FormPhoto;
