import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '../../shared';

import clearIcon from '../../../assets/img/icons/clear.svg';

import './FormTags.scss';
import './FormTagsTheme.scss';

const FormTags = ({
  value,
  setValue,
  name,
  label = '',
  labelBlock = true,
  note = '',
  max = null,
  error = null,
}) => {
  const {
    control: inputControl,
    setValue: setInputValue,
    handleSubmit: inputHandleSubmit,
  } = useForm({
    shouldFocusError: false,
    defaultValues: { [`${name}-input`]: '' },
  });

  const tagsListRef = useRef(null);
  const tagsInputRef = useRef(null);

  const [tagsList, setTagsList] = useState(value);

  useEffect(() => {
    setTagsList(value);
  }, [value]);

  const onInputSubmit = (form) => {
    const newValue = form[`${name}-input`].trim();
    if (newValue && !tagsList.includes(newValue)) {
      setTagsList((tags) => [...tags, newValue]);
    }
  };

  const [showClear, setShowClear] = useState(tagsList.length > 0);

  useEffect(() => {
    setShowClear(tagsList.length > 0);
    setInputValue(`${name}-input`, '', { shouldValidate: false });
    setValue(name, tagsList, { shouldValidate: false });
    if (max && tagsList.length >= max) {
      tagsInputRef.current.blur();
    }
  }, [tagsList]);

  const handleClearInput = () => setTagsList([]);

  const handleRemoveTag = (value) =>
    setTagsList((tags) => tags.filter((tag) => tag !== value));

  const inputContent = (
    <>
      <div className="form__tags form-tags">
        <div className="form-tags__list" ref={tagsListRef}>
          {tagsList.map((tag) => (
            <div key={tag} className="form-tags__item">
              <p>{tag}</p>
              <img src={clearIcon} onClick={() => handleRemoveTag(tag)} />
            </div>
          ))}

          <Controller
            control={inputControl}
            name={`${name}-input`}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`form-tags__input${error ? ' is-error' : ''} ${
                  max && tagsList.length === max ? 'is-disabled' : ''
                }`}
                placeholder={max && tagsList.length >= max ? '' : 'Add'}
                onKeyDown={(e) =>
                  e.key === 'Enter' && inputHandleSubmit(onInputSubmit)()
                }
                onFocus={() => tagsListRef.current.classList.add('is-focus')}
                onBlur={() => tagsListRef.current.classList.remove('is-focus')}
                tabIndex={max && tagsList.length >= max ? -1 : null}
                ref={tagsInputRef}
              />
            )}
          />
        </div>

        <div className="form-tags__nav input-nav">
          <div className="input-nav__content">
            {showClear && (
              <Button
                callback={handleClearInput}
                icon={{
                  iconSrc: clearIcon,
                  iconOnly: true,
                  iconSize: 'sm',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {note && <p className="form__note">{note}</p>}
    </>
  );

  return labelBlock ? (
    <div className="form__block">
      {(label || max) && (
        <div className="form__block-head">
          {label && (
            <label className="form__label">
              {label}
              {max && ` (maximum up to ${max})`}
            </label>
          )}

          {max && (
            <p className="form__counter">
              {tagsList.length}/{max}
            </p>
          )}
        </div>
      )}

      {inputContent}
    </div>
  ) : (
    inputContent
  );
};

export default FormTags;
