import { useState, useEffect, useContext, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ThemeContext } from '../../../App';
import { ReactSortable } from 'react-sortablejs';
import { useOnResize } from '../../../hooks';

import EditorAdd from '../EditorAdd/EditorAdd';
import EditorBlockNav from '../EditorBlockNav/EditorBlockNav';
import * as Blocks from '../blocks';

import './Editor.scss';
import './EditorTheme.scss';

const Editor = ({
  mode = 'view',
  isPreview = false,
  previewHeader = null,
  articleData = null,
  setArticleData = null,
  validation = null,
  setValidation = null,
  className = '',
}) => {
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      title: articleData.title,
    },
  });

  const titleValue = watch('title');

  useEffect(() => {
    handleResizeTextarea();
  }, [titleValue]);

  const textareaRef = useRef(null);
  const handleResizeTextarea = () => {
    if (mode === 'edit') {
      textareaRef.current.style.height = 'auto';
      if (titleValue) {
        const newHeight =
          textareaRef.current.scrollHeight +
          textareaRef.current.offsetHeight -
          textareaRef.current.clientHeight;
        textareaRef.current.style.height = `${newHeight}px`;
      }
    }
  };

  useOnResize(handleResizeTextarea);

  const [blocks, setBlocks] = useState(
    mode === 'view'
      ? articleData.editorBlocks
      : articleData.editorBlocks.map((block, index) => ({
          ...block,
          id: index,
          valid: block.valid ?? true,
        }))
  );

  useEffect(() => {
    if (mode === 'edit') {
      setValidation((prev) => ({
        isValid: {
          ...prev.isValid,
          editor:
            titleValue.length > 0 &&
            blocks.filter((block) => !block.valid).length === 0,
        },
        shouldValidate: false,
      }));

      setArticleData((data) => ({
        ...data,
        title: titleValue,
        editorBlocks: blocks,
      }));
    }
  }, [titleValue, blocks]);

  useEffect(() => {
    if (mode === 'edit' && validation.shouldValidate) {
      trigger('title');

      if (!titleValue) {
        textareaRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [validation]);

  const theme = useContext(ThemeContext);
  useEffect(() => {
    document.getElementById('root').dataset.theme = theme;
  }, [theme]);

  const [isMoving, setIsMoving] = useState(false);

  const blocksList = blocks.map((block, index) => {
    const Block = Blocks[block.type[0].toUpperCase() + block.type.slice(1)];

    return (
      <div
        key={block.id ?? index}
        className={`editor-block editor-block--${block.type}`}
      >
        {mode === 'edit' && !isPreview && (
          <EditorBlockNav id={block.id} setBlocks={setBlocks} />
        )}

        <Block
          data={block}
          name={`editor-${block.type}-${block.id ?? index}`}
          mode={mode}
          isPreview={isPreview}
          setBlocks={setBlocks}
          isMoving={isMoving}
          className="editor-block__content"
          shouldValidate={mode === 'edit' ? validation.shouldValidate : null}
        />
      </div>
    );
  });

  return (
    <form
      className={`editor form is-${mode}-mode ${
        isPreview ? 'is-preview' : ''
      } ${className}`}
      autoComplete="off"
      noValidate="novalidate"
      onSubmit={(e) => e.preventDefault()}
    >
      {mode === 'edit' && (
        <>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <textarea
                {...field}
                className={`editor__title ${errors.title ? 'is-error' : ''}`}
                placeholder="Title"
                maxLength={100}
                rows={1}
                onPaste={handleResizeTextarea}
                ref={(element) => {
                  field.ref(element);
                  textareaRef.current = element;
                }}
                style={{ pointerEvents: isPreview ? 'none' : null }}
              />
            )}
          />

          {isPreview && previewHeader}
        </>
      )}

      {blocks.length > 0 &&
        (mode === 'edit' ? (
          <ReactSortable
            list={blocks}
            setList={setBlocks}
            handle=".editor-block__drag"
            dragoverBubble={false}
            animation={300}
            onStart={() => setIsMoving(true)}
            onEnd={() => setIsMoving(false)}
            className="editor__track editor-track"
          >
            {blocksList}
          </ReactSortable>
        ) : (
          blocksList
        ))}

      {mode === 'edit' && !isPreview && (
        <EditorAdd blocks={blocks} setBlocks={setBlocks} />
      )}
    </form>
  );
};

export default Editor;
