import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectArticle } from '../../store/reducers/articlesReducer';
import { selectCurrentUser } from '../../store/reducers/usersReducer';
import { show } from '../../store/reducers/popupReducer';
import { populatePost } from '../../utils/populate';

import ArticleEditorNav from '../../components/ArticleEditorNav/ArticleEditorNav';
import ArticleEditorFooter from '../../components/ArticleEditorFooter/ArticleEditorFooter';
import PageArticleHeader from '../../components/PageArticleHeader/PageArticleHeader';
import Editor from '../../components/editor/Editor/Editor';
import Main from '../../layout/main/Main/Main';
import PopupEditor from '../../layout/popup/PopupEditor/PopupEditor';
import ErrorPage from '../ErrorPage/ErrorPage';

import { Button } from '../../components/shared';

import './PostEditor.scss';

const PostEditor = ({ activePopup, editMode = false }) => {
  const [previewMode, setPreviewMode] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    return <ErrorPage />;
  }

  const { id: postId } = useParams();
  const articleToEdit = editMode
    ? useSelector(selectArticle(Number(postId)))
    : null;

  if (editMode && (!articleToEdit || articleToEdit.author !== currentUser.id)) {
    return <ErrorPage />;
  }

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const [articleData, setArticleData] = useState(
    editMode ? articleToEdit : { ...populatePost(), author: currentUser.id }
  );

  const [validation, setValidation] = useState({
    isValid: { editor: false },
    shouldValidate: false,
  });

  const startValidation = () => {
    setValidation((value) => ({
      ...value,
      shouldValidate: true,
    }));
  };

  const handlePreviewClick = () => {
    validation.isValid.editor
      ? setPreviewMode((prev) => !prev)
      : startValidation();
  };

  const [saveDraft, setSaveDraft] = useState(false);

  const saveDraftCallback = () => {
    if (validation.isValid.editor) {
      dispatchShowPopup('post-editor');
      setSaveDraft(true);
    } else {
      startValidation();
    }
  };

  const body = (
    <>
      <div className="main-body__content post-editor__content row row-16">
        <div className="col col-4 col-xl-2 col-lg-0"></div>

        <div className="col col-8 col-lg-12">
          <Editor
            mode="edit"
            isPreview={previewMode}
            previewHeader={
              <PageArticleHeader article={articleData} isPreview={true} />
            }
            articleData={articleData}
            setArticleData={setArticleData}
            validation={validation}
            setValidation={setValidation}
          />
        </div>

        <div className="col col-4 col-xl-2 col-lg-0"></div>
      </div>

      {!previewMode && (
        <ArticleEditorFooter
          backButton={
            <Button
              callback={() => history.back()}
              title="Cancel"
              type="secondary"
              size="md"
            />
          }
          forwardButton={
            <Button
              callback={() =>
                validation.isValid.editor
                  ? dispatchShowPopup('post-editor')
                  : setValidation((value) => ({
                      ...value,
                      shouldValidate: true,
                    }))
              }
              title="Continue"
              type="primary"
              size="md"
            />
          }
        />
      )}
    </>
  );

  return (
    <>
      <Main
        body={body}
        navBar={
          <ArticleEditorNav
            article={articleData}
            user={currentUser}
            isPreviewMode={previewMode}
            previewCallback={handlePreviewClick}
            saveDraftCallback={saveDraftCallback}
            editMode={editMode}
          />
        }
        className={`post-editor ${previewMode ? 'is-preview-mode' : ''}`}
      />

      <PopupEditor
        articleData={articleData}
        setArticleData={setArticleData}
        isActive={activePopup === 'post-editor'}
        saveDraft={saveDraft}
        setSaveDraft={setSaveDraft}
        editMode={editMode}
      />
    </>
  );
};

export default PostEditor;
