import { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../../../../App';
import { Editor } from '@tinymce/tinymce-react';

import './icons';

import './Text.scss';
import './TextTheme.scss';
import './Tinymce.scss';
import './TinymceTheme.scss';

const Text = ({
  data,
  name,
  mode,
  isPreview,
  setBlocks,
  isMoving,
  className = '',
}) => {
  const [editorValue, setEditorValue] = useState(data.value);

  const theme = useContext(ThemeContext);

  const editorRef = useRef(null);
  const formRef = useRef(null);

  const onEditorInputChange = (newValue) => {
    setEditorValue(newValue);
  };

  const handleUpdate = () => {
    setBlocks((blocks) =>
      blocks.map((item) =>
        item.id === data.id ? { ...item, value: editorValue } : item
      )
    );
  };

  return (
    <div className={`block-text ${className}`}>
      {mode === 'view' || isPreview ? (
        <div
          className="block-text__result"
          dangerouslySetInnerHTML={{ __html: data.value }}
        />
      ) : (
        <div className="editor-block__form block-text__form" ref={formRef}>
          {isMoving ? (
            <div dangerouslySetInnerHTML={{ __html: editorValue }} />
          ) : (
            <Editor
              id={name}
              textareaName={name}
              onInit={(e, editor) => {
                editorRef.current = editor;
                formRef.current.querySelector(`[name="${name}"]`).placeholder =
                  'Text block';
                [
                  'meta+c',
                  'meta+v',
                  'meta+k',
                  'meta+s',
                  ...[...Array(9).keys()].map((item) => `access+${item + 1}`),
                ].map((shortcut) => editor.shortcuts.remove(shortcut));
              }}
              value={editorValue}
              onEditorChange={(newValue) => onEditorInputChange(newValue)}
              onBlur={handleUpdate}
              init={{
                plugins: 'link lists quickbars autoresize',
                mobile: {
                  plugins: 'link lists quickbars autoresize',
                },
                placeholder: 'Start typing...',
                auto_focus: editorValue ? null : name,
                min_height: 0,
                icons: 'future',
                skin: 'future',
                content_css: 'future',
                content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&display=swap');`,
                body_class: theme === 'dark' ? 'is-dark-mode' : '',
                statusbar: false,
                menubar: false,
                toolbar: false,
                contextmenu: false,
                contextmenu_never_use_native: true,
                quickbars_insert_toolbar: false,
                quickbars_image_toolbar: false,
                quickbars_selection_toolbar:
                  'bold italic strikethrough quicklink | alignleft aligncenter alignright',
                paste_block_drop: true,
                paste_as_text: true,
                paste_remove_styles_if_webkit: true,
                autoresize_bottom_margin: 0,
                block_formats: 'Paragraph=p',
              }}
              key={theme}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Text;
