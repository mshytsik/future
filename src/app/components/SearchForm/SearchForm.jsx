import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from '../../store/reducers/popupReducer';
import { selectTerms } from '../../store/reducers/articlesReducer';
import { errorHandler } from '../../utils/utils';

import { Form, FormInput } from '../form';
import { Tabs, Tag, Select } from '../shared';

import hashIcon from '../../assets/img/icons/hash-dark.svg';

import './SearchForm.scss';

const SearchForm = ({ search, callback, isPopup = false, filter = null }) => {
  const tabs = [
    { name: 'Tags', value: 'tag' },
    { name: 'Posts', value: 'post' },
    { name: 'Authors', value: 'author' },
  ];

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      search: search.value.value,
    },
  });

  const onSubmit = (data) => {
    search.setter({ value: data.search, area: search.value.area });
    callback?.();
  };

  useEffect(() => {
    setValue('search', search.value.value, { shouldValidate: false });
  }, [search.value.value]);

  const handleSetActive = (area) => {
    search.setter((prev) => ({ ...prev, area }));
  };

  const dispatch = useDispatch();

  const tags = useSelector(selectTerms('post', 'tags'));

  return (
    <div className="search-form">
      <Form onSubmit={handleSubmit(onSubmit, (errors) => errorHandler(errors))}>
        <FormInput
          control={control}
          value={getValues('search')}
          setValue={setValue}
          name="search"
          type="text"
          placeholder="Search"
          required={true}
          error={errors.search}
          isSearch
          handleSubmit={handleSubmit(onSubmit, (errors) =>
            errorHandler(errors)
          )}
        />
      </Form>

      <div className="search-form__nav">
        <Tabs
          tabs={tabs}
          activeTab={search.value.area}
          setActive={handleSetActive}
        />

        {isPopup
          ? search.value.area === 'tag' && (
              <div className="tags-list">
                <p className="tags-list__title">Recommended:</p>

                {tags &&
                  tags.slice(0, 5).map((tag) => (
                    <Tag
                      key={tag.id}
                      tag={{
                        type: 'post',
                        ...tag,
                        icon: hashIcon,
                        color: '',
                        isHash: true,
                      }}
                      callback={() => dispatch(hide())}
                    />
                  ))}
              </div>
            )
          : filter && (
              <Select
                options={filter.options}
                value={filter.value}
                setOptionValue={filter.setValue}
                className="search-form__filter select--left-xs hide-sm hide-xs"
              />
            )}
      </div>
    </div>
  );
};

export default SearchForm;
