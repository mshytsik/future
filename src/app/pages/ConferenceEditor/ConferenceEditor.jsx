import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  selectArticle,
  selectArticles,
  add,
  edit,
} from '../../store/reducers/articlesReducer';
import { selectCurrentUser } from '../../store/reducers/usersReducer';
import { populateConference } from '../../utils/populate';
import { setDate } from '../../utils/dateTime';
import { getNewId } from '../../utils/utils';
import { sanitizeEditorBlocks } from '../../utils/articles';

import ArticleEditorNav from '../../components/ArticleEditorNav/ArticleEditorNav';
import ArticleEditorFooter from '../../components/ArticleEditorFooter/ArticleEditorFooter';
import PageArticleHeader from '../../components/PageArticleHeader/PageArticleHeader';
import Steps from '../../components/Steps/Steps';
import ConferenceDataForm from '../../components/ConferenceDataForm/ConferenceDataForm';
import PreviewBlock from '../../components/PreviewBlock/PreviewBlock';
import Editor from '../../components/editor/Editor/Editor';
import SpeakersForm from '../../components/SpeakersForm/SpeakersForm';
import Main from '../../layout/main/Main/Main';
import ErrorPage from '../ErrorPage/ErrorPage';

import { Button } from '../../components/shared';

import './ConferenceEditor.scss';
import './ConferenceEditorTheme.scss';

import imageDefault from '../../assets/img/images/default-image.jpg';

const ConferenceEditor = ({ editMode = false }) => {
  const [previewMode, setPreviewMode] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    return <ErrorPage />;
  }

  const { id: conferenceId } = useParams();
  const articleToEdit = editMode
    ? useSelector(selectArticle(Number(conferenceId)))
    : null;

  if (editMode && (!articleToEdit || articleToEdit.author !== currentUser.id)) {
    return <ErrorPage />;
  }

  const [articleData, setArticleData] = useState(
    editMode
      ? articleToEdit
      : { ...populateConference(), author: currentUser.id }
  );

  const { setValue, watch } = useForm({
    shouldFocusError: false,
    defaultValues: {
      image: articleData.image,
    },
  });

  const validationSteps = ['dataForm', 'editor', 'speakers'];

  const [validation, setValidation] = useState({
    isValid: {
      dataForm: false,
      editor: false,
      speakers: true,
    },
    shouldValidate: false,
  });

  const imageValue = watch('image');
  useEffect(() => {
    setArticleData((data) => ({ ...data, image: imageValue }));
  }, [imageValue]);

  const [activeStep, setActiveStep] = useState(1);

  const handlePrevStep = () => {
    if (activeStep === 1) {
      history.back();
    } else {
      if (validation.isValid[validationSteps[activeStep - 1]]) {
        setValidation((value) => ({
          isValid: {
            ...value.isValid,
            [validationSteps[activeStep - 2]]: false,
          },
          shouldValidate: false,
        }));
        setActiveStep((activeStep) => activeStep - 1);
      } else {
        startValidation();
      }
    }
  };

  const handleNextStep = () => {
    if (validation.isValid[validationSteps[activeStep - 1]]) {
      activeStep === 3
        ? submitConference(currentUser.isModerator ? 'publish' : 'pending')
        : setActiveStep((activeStep) => activeStep + 1);
    } else {
      startValidation();
    }
  };

  const [triggerDataForm, setTriggerDataForm] = useState('');

  const startValidation = () =>
    setValidation((value) => ({
      ...value,
      shouldValidate: true,
    }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector(selectArticles);

  const submitConference = (status) => {
    const conferenceData = {
      ...articleData,
      id: editMode ? articleData.id : getNewId(articles),
      status: status,
      image: articleData.image ? articleData.image : imageDefault,
      editorBlocks: sanitizeEditorBlocks(articleData.editorBlocks ?? []),
    };

    dispatch(editMode ? edit(conferenceData) : add(conferenceData));
    navigate(
      `/author/${currentUser.nickname}#${
        status === 'publish' ? 'conferences' : status
      }`
    );
  };

  useEffect(() => {
    if (validation.isValid.dataForm && triggerDataForm) {
      triggerDataForm === 'preview'
        ? setPreviewMode(true)
        : saveDraftCallback();
    }
  }, [validation.isValid.dataForm]);

  const handlePreviewClick = () => {
    activeStep === 1 && setTriggerDataForm(!previewMode ? 'preview' : '');
    !previewMode && startValidation();
    if (validation.isValid[validationSteps[activeStep - 1]]) {
      setPreviewMode((prev) => !prev);
    }
  };

  const saveDraftCallback = () => {
    setTriggerDataForm(activeStep === 1 ? 'saveDraft' : '');
    validation.isValid[validationSteps[activeStep - 1]]
      ? submitConference('draft')
      : startValidation();
  };

  const body = (
    <>
      <div className="main-body__content row row-16">
        <div className="col col-4 col-xl-2 col-lg-0"></div>

        <div className="conference-editor__content col col-8 col-lg-12">
          {!previewMode && (
            <>
              {activeStep !== 2 && (
                <p className="conference-editor__title">
                  {editMode ? 'Edit the' : 'Create an'} event
                </p>
              )}

              <div className="row">
                <div className="col col-9 col-lg-8 col-md-12">
                  {activeStep !== 2 && (
                    <p className="conference-editor__subtitle">
                      Add additional information for your event. Changes here
                      will affect how your story appears in public areas such as
                      home page and personal profile, not the content of the
                      story itself.
                    </p>
                  )}

                  <Steps
                    items={[
                      { subtitle: 'General information' },
                      { subtitle: 'Description' },
                      { subtitle: 'Participants' },
                    ]}
                    activeItem={activeStep}
                  />

                  {activeStep === 1 && (
                    <ConferenceDataForm
                      articleData={articleData}
                      setArticleData={setArticleData}
                      setImageValue={setValue}
                      shouldValidate={validation.shouldValidate}
                      setValidation={setValidation}
                      onValidCallback={() =>
                        !triggerDataForm && setActiveStep((prev) => prev + 1)
                      }
                    />
                  )}
                </div>

                <div className="col col-3 col-lg-4 col-md-0">
                  {activeStep === 1 && (
                    <PreviewBlock
                      value={articleData.image}
                      setValue={setValue}
                      imageName="image"
                      title={articleData.title ? articleData.title : 'Untitled'}
                      description={
                        articleData.description
                          ? articleData.description
                          : 'Description'
                      }
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {(activeStep === 2 || previewMode) && (
            <Editor
              mode="edit"
              isPreview={previewMode}
              previewHeader={
                <PageArticleHeader
                  article={{
                    ...articleData,
                    dateTime: {
                      ...articleData.dateTime,
                      start: articleData.dateTime.start
                        ? articleData.dateTime.start
                        : setDate(Date.now()),
                    },
                  }}
                  isPreview={true}
                />
              }
              articleData={articleData}
              setArticleData={setArticleData}
              validation={validation}
              setValidation={setValidation}
            />
          )}

          {activeStep === 3 && !previewMode && (
            <SpeakersForm
              articleData={articleData}
              setArticleData={setArticleData}
              validation={validation}
              setValidation={setValidation}
            />
          )}
        </div>

        <div className="col col-4 col-xl-2 col-lg-0"></div>
      </div>

      {!previewMode && (
        <ArticleEditorFooter
          backButton={
            <Button
              callback={handlePrevStep}
              title={activeStep === 1 ? 'Cancel' : 'Back'}
              type="secondary"
              size="md"
            />
          }
          forwardButton={
            <Button
              callback={handleNextStep}
              title={
                activeStep === 3
                  ? currentUser.isModerator
                    ? 'Publish'
                    : 'Submit for review'
                  : 'Continue'
              }
              type="primary"
              size="md"
            />
          }
        />
      )}
    </>
  );

  return (
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
      className={`conference-editor ${previewMode ? 'is-preview-mode' : ''}`}
    />
  );
};

export default ConferenceEditor;
