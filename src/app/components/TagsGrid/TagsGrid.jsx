import { useContext } from 'react';
import { ThemeContext } from '../../App';

import { Tag } from '../shared';

import radioIcon from '../../assets/img/icons/radio.svg';
import radioIconDark from '../../assets/img/icons/theme/radio.svg';

import './TagsGrid.scss';
import './TagsGridTheme.scss';

const TagsGrid = ({ tags, type = 'post' }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="tags-grid">
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          tag={{
            type,
            ...tag,
            icon: theme === 'light' ? radioIcon : radioIconDark,
            color: '',
            isHash: false,
          }}
        />
      ))}
    </div>
  );
};

export default TagsGrid;
