import { useContext } from 'react';
import { ThemeContext } from '../../../App';

import { Button } from '../../shared';

import dragIcon from '../../../assets/img/icons/drag-dots.svg';
import dragIconDark from '../../../assets/img/icons/theme/drag-dots.svg';
import closeIcon from '../../../assets/img/icons/close-grey.svg';

const EditorBlockNav = ({ id, setBlocks }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="editor-block__nav">
      <Button
        callback={() =>
          setBlocks((blocks) => blocks.filter((item) => item.id !== id))
        }
        icon={{
          iconSrc: closeIcon,
          iconOnly: true,
          iconSize: 'xs',
        }}
      />

      <Button
        icon={{
          iconSrc: theme === 'light' ? dragIcon : dragIconDark,
          iconOnly: true,
          iconSize: 'xs',
        }}
        className="editor-block__drag"
      />
    </div>
  );
};

export default EditorBlockNav;
