import { useContext } from 'react';
import { ThemeContext } from '../../App';
import { loadImageFile } from '../../utils/image';

import { Button } from '../shared';

import imageIcon from '../../assets/img/icons/image.svg';
import imageIconDark from '../../assets/img/icons/theme/image.svg';

import './PreviewBlock.scss';
import './PreviewBlockTheme.scss';

const PreviewBlock = ({
  value,
  setValue,
  imageName,
  title = '',
  description = '',
  isLabel = false,
  className = '',
}) => {
  const handleChange = (e) =>
    loadImageFile(
      e,
      (imageSrc) => setValue(imageName, imageSrc, { shouldValidate: false }),
      () => setValue(imageName, '', { shouldValidate: false })
    );

  const theme = useContext(ThemeContext);

  return (
    <div className={`editor-preview ${className}`}>
      <div
        className="editor-preview__cover"
        style={{ backgroundImage: `url(${value})` }}
      >
        {!isLabel && (
          <input
            type="file"
            id={imageName}
            name={imageName}
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            hidden
          />
        )}

        <Button
          callback={() => {}}
          icon={{
            iconSrc: theme === 'light' ? imageIcon : imageIconDark,
            iconOnly: true,
            iconSize: 'lg',
          }}
          isLabelFor={imageName}
        />
      </div>

      {title && <p className="editor-preview__title">{title}</p>}

      {description && (
        <p className="editor-preview__description">{description}</p>
      )}
    </div>
  );
};

export default PreviewBlock;
