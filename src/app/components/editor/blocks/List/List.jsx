import { useState, useEffect } from 'react';

import { FormList } from '../../../form';

import './List.scss';
import './ListTheme.scss';

const List = ({
  data,
  name,
  mode,
  isPreview,
  setBlocks,
  className = '',
  shouldValidate,
}) => {
  const [items, setItems] = useState(data.items);

  useEffect(() => {
    if (setBlocks) {
      setBlocks((blocks) =>
        blocks.map((item) =>
          item.id === data.id
            ? {
                ...item,
                valid:
                  items.length > 0 &&
                  items.filter((item) => !item).length === 0,
                items: items,
              }
            : item
        )
      );
    }
  }, [items]);

  const listItems = items.map(
    (item, index) =>
      item && (
        <li key={index}>
          <p>{item}</p>
        </li>
      )
  );

  return (
    <div className={`block-list ${className}`}>
      {mode === 'view' || isPreview ? (
        data.ordered ? (
          <ol className="block-list__result">{listItems}</ol>
        ) : (
          <ul className="block-list__result">{listItems}</ul>
        )
      ) : (
        <FormList
          items={items}
          setItems={setItems}
          name={name}
          placeholder="Add a list item"
          shouldValidate={shouldValidate}
          focusOnMount
        />
      )}
    </div>
  );
};

export default List;
