import { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ThemeContext } from '../../../App';
import { ReactSortable } from 'react-sortablejs';
import { errorHandler } from '../../../utils/utils';

import { Button } from '../../shared';
import { FormInput } from '../../form';

import dragIcon from '../../../assets/img/icons/drag-dots.svg';
import dragIconDark from '../../../assets/img/icons/theme/drag-dots.svg';
import minusIcon from '../../../assets/img/icons/minus.svg';
import plusIcon from '../../../assets/img/icons/plus-dark.svg';
import plusIconDark from '../../../assets/img/icons/plus-light.svg';

import './FormList.scss';

const FormList = ({
  items,
  setItems,
  max = null,
  name,
  placeholder,
  buttonPlaceholder = 'Add item',
  shouldValidate,
  focusOnMount = false,
}) => {
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      [name]: items.map((item) => ({ value: item })),
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: name });

  const [sortedItems, setSortedItems] = useState(fields);

  useEffect(() => {
    setItems(sortedItems.map((item) => item.value));
  }, [sortedItems]);

  const onError = (errors, showErrors = true) => {
    setSortedItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        value: errors[name][getFieldIndexById(item.id)] ? '' : item.value,
      }))
    );

    shouldValidate &&
      errorHandler(
        errors[name],
        errors[name].filter((error) => error).length
          ? `${name}.${errors[name].findIndex((error) => error)}.value`
          : ''
      );

    if (!showErrors) {
      clearErrors();
    }
  };

  const onSubmit = (formData) => {
    setSortedItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        value: formData[name][getFieldIndexById(item.id)].value
          .toString()
          .trim(),
      }))
    );
  };

  const [shouldFocus, setShouldFocus] = useState(focusOnMount);

  useEffect(() => {
    if (sortedItems.length < fields.length) {
      setSortedItems((prevItems) => [...prevItems, fields[fields.length - 1]]);
    }
  }, [fields]);

  const focusOnLastItem = () => {
    setTimeout(() => {
      if (shouldFocus) {
        setFocus(`${name}.${fields.length - 1}.value`);
        setShouldFocus(false);
      }
    }, 0);
  };

  useEffect(() => {
    focusOnLastItem();
  }, [shouldFocus]);

  const handleAddItem = () => {
    append({ value: '' });
    setShouldFocus(true);
  };

  const handleAddItemOnSubmit = (value, index) =>
    value && index === sortedItems.length - 1
      ? handleAddItem()
      : document.activeElement.blur();

  const handleRemove = (id) => {
    remove(getFieldIndexById(id));
    setSortedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getFieldIndexById = (id) =>
    fields.findIndex((field) => field.id === id);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (shouldValidate) {
      clearErrors();
      handleSubmit(onSubmit, onError)();
    }
  }, [shouldValidate]);

  return (
    <div className="form-list">
      {sortedItems.length > 0 && (
        <ReactSortable
          list={sortedItems}
          setList={setSortedItems}
          handle=".list-item__handle"
          dragoverBubble={false}
          animation={300}
          className="form-list__body"
        >
          {sortedItems.map((item, index) => (
            <div key={item.id} className="list-item">
              <FormInput
                control={control}
                value={getValues(`${name}.${getFieldIndexById(item.id)}.value`)}
                setValue={setValue}
                name={`${name}.${getFieldIndexById(item.id)}.value`}
                labelBlock={false}
                type="text"
                required
                placeholder={placeholder}
                error={errors[name]?.[getFieldIndexById(item.id)]}
                handleSubmit={() =>
                  handleAddItemOnSubmit(
                    getValues(`${name}.${getFieldIndexById(item.id)}.value`),
                    index
                  )
                }
                submitOnEnter
                onChangeCallback={handleSubmit(onSubmit, (errors) =>
                  onError(errors, false)
                )}
              />

              <Button
                icon={{
                  iconSrc: theme === 'light' ? dragIcon : dragIconDark,
                  iconOnly: true,
                  iconSize: 'xs',
                }}
                className="list-item__handle"
              />

              <Button
                callback={() => handleRemove(item.id)}
                icon={{
                  iconSrc: minusIcon,
                  iconOnly: true,
                  iconSize: 'md',
                }}
              />
            </div>
          ))}
        </ReactSortable>
      )}

      {!sortedItems.find((item) => item) && (
        <p className="form-list__error form__error">The list is not filled.</p>
      )}

      {(max ? sortedItems.length < max : true) && (
        <Button
          callback={handleAddItem}
          title={buttonPlaceholder}
          icon={{
            iconSrc: theme === 'light' ? plusIcon : plusIconDark,
          }}
          type="secondary"
          size="md"
          className="form-list__add"
        />
      )}
    </div>
  );
};

export default FormList;
