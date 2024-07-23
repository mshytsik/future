import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../../store/reducers/usersReducer';
import {
  add,
  edit,
  selectArticles,
  selectTerms,
} from '../../../store/reducers/articlesReducer';
import { hide } from '../../../store/reducers/popupReducer';
import { useAddTags } from '../../../hooks';
import { getNewId, errorHandler } from '../../../utils/utils';
import { sanitizeEditorBlocks } from '../../../utils/articles';

import Popup from '../Popup/Popup';
import PreviewBlock from '../../../components/PreviewBlock/PreviewBlock';
import {
  Form,
  FormInput,
  FormSelect,
  FormTags,
} from '../../../components/form';
import { Button } from '../../../components/shared';

import imageDefault from '../../../assets/img/images/default-image.jpg';

import './PopupEditor.scss';
import './PopupEditorTheme.scss';

const PopupEditor = ({
  articleData,
  setArticleData,
  isActive,
  saveDraft,
  setSaveDraft,
  editMode,
}) => {
  const dispatch = useDispatch();

  const articles = useSelector(selectArticles);
  const postCategories = useSelector(selectTerms('post', 'categories'));
  const postTags = useSelector(selectTerms('post', 'tags'));
  const currentUser = useSelector(selectCurrentUser);

  const defaultValues = {
    title: articleData.title,
    description: articleData.description,
    minutesToRead: articleData.minutesToRead,
    image: articleData.image,
    category:
      articleData.category ??
      postCategories.filter(
        (category) =>
          category.slug !== 'knowledge-base' || currentUser.isModerator
      )[0].id,
    tags: articleData.tags
      ? articleData.tags.map(
          (tag) => postTags.find((item) => item.id === tag).name
        )
      : [],
  };

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: false, defaultValues });

  useEffect(() => {
    setValue('title', articleData.title, { shouldValidate: false });
  }, [articleData.title]);

  const navigate = useNavigate();

  const addTags = useAddTags('post');

  const onSubmit = (data, status) => {
    const postData = {
      ...articleData,
      id: editMode ? articleData.id : getNewId(articles),
      status: status,
      title: data.title,
      description: data.description,
      image: data.image ? data.image : imageDefault,
      minutesToRead: data.minutesToRead,
      category: data.category,
      tags: addTags(data.tags),
      editorBlocks: sanitizeEditorBlocks(articleData.editorBlocks ?? []),
    };

    dispatch(editMode ? edit(postData) : add(postData));
    dispatch(hide());
    reset();
    navigate(
      `/author/${currentUser.nickname}#${
        status === 'publish' ? 'posts' : status
      }`
    );
  };

  const [titleValue, descriptionValue, imageValue] = watch([
    'title',
    'description',
    'image',
  ]);

  useEffect(() => {
    setArticleData((data) => ({
      ...data,
      title: titleValue,
      description: descriptionValue,
      image: imageValue,
    }));
  }, [titleValue, descriptionValue, imageValue]);

  const handleAddPost = (status) => {
    handleSubmit(
      (data) => onSubmit(data, status),
      (errors) => errorHandler(errors)
    )();
  };

  useEffect(() => {
    if (saveDraft) {
      handleAddPost('draft');
      setSaveDraft(false);
    }
  }, [saveDraft]);

  return (
    <Popup
      isActive={isActive}
      size="sm"
      head={{ title: 'Post details' }}
      className="editor-popup"
      useBodyWrap
    >
      <Form bodyWrap={false}>
        <>
          <div className="editor-popup__body">
            <div className="editor-popup__content">
              <p className="popup__subtitle">
                Add additional information for your post. Changes here will
                affect how your story appears in public areas such as home page
                and personal profile, not the content of the story itself.
              </p>

              <div className="form__body">
                <p className="form__subtitle">General information</p>

                <PreviewBlock
                  value={getValues('image')}
                  setValue={setValue}
                  imageName="image"
                  isLabel
                />

                <FormInput
                  control={control}
                  value={getValues('title')}
                  setValue={setValue}
                  name="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  required
                  maxLength={100}
                  error={errors.title}
                />

                <FormInput
                  control={control}
                  value={getValues('description')}
                  setValue={setValue}
                  name="description"
                  label="Short description"
                  type="textarea"
                  placeholder="Short post description..."
                  required
                  maxLength={200}
                  error={errors.description}
                />

                <FormSelect
                  control={control}
                  value={getValues('category')}
                  setValue={setValue}
                  name="category"
                  options={postCategories
                    .filter(
                      (category) =>
                        category.slug !== 'knowledge-base' ||
                        currentUser.isModerator
                    )
                    .map((item) => ({
                      name: item.name,
                      value: item.id,
                    }))}
                  label="Category"
                  error={errors.category}
                />

                <FormInput
                  control={control}
                  value={getValues('minutesToRead')}
                  setValue={setValue}
                  name="minutesToRead"
                  label="Time to read (minutes)"
                  type="number"
                  placeholder="5"
                  max={60}
                  min={1}
                  error={errors.minutesToRead}
                />

                <FormTags
                  value={getValues('tags')}
                  setValue={setValue}
                  name="tags"
                  label="Tags"
                  max={2}
                  required
                  error={errors.tags}
                  note="Add or change tags to let readers know what your post is about"
                />
              </div>
            </div>

            <PreviewBlock
              value={getValues('image')}
              setValue={setValue}
              imageName="image"
              title={articleData.title}
              description={articleData.description}
              className="editor-popup__sidebar"
            />
          </div>

          <div className="editor-popup__footer">
            <div className="editor-popup__footer-nav">
              <Button
                callback={() => dispatch(hide())}
                title="Cancel"
                type="secondary"
                size="md"
              />

              <Button
                callback={() => handleAddPost('draft')}
                title="Save as draft"
                type="secondary"
                size="md"
                className="hide-xs"
              />

              <Button
                callback={() =>
                  handleAddPost(currentUser.isModerator ? 'publish' : 'pending')
                }
                title={
                  currentUser.isModerator ? 'Publish' : 'Submit for review'
                }
                type="primary"
                size="md"
              />
            </div>
          </div>
        </>
      </Form>
    </Popup>
  );
};

export default PopupEditor;
