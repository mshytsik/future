import { useNavigate } from 'react-router-dom';
import { getRandomColorName } from '../../../utils/random';

import hashIcon from '../../../assets/img/icons/tag.svg';

import './Tag.scss';
import './TagTheme.scss';

const Tag = ({
  tag: {
    type: articleType,
    slug,
    name,
    icon = '',
    color = 'random',
    isHash = false,
  },
  type = 'tag',
  callback = null,
  className = '',
}) => {
  const navigate = useNavigate();

  const iconSrc = isHash ? hashIcon : icon;

  const colorValue = color === 'random' ? getRandomColorName() : color;

  const handleClick = (e) => {
    e.preventDefault();
    callback?.();
    navigate(`/${articleType}s/${type}/${slug}`);
  };

  return (
    <div
      className={`tag ${className} ${isHash ? 'tag--hash' : ''}`}
      onClick={(e) => handleClick(e)}
    >
      <div
        className={`tag__icon ${
          !isHash && colorValue ? `color--${colorValue}` : ''
        }`}
      >
        {iconSrc ? <img src={iconSrc} /> : <p>{name[0]}</p>}
      </div>

      <p className="tag__title">{name}</p>
    </div>
  );
};

export default Tag;
