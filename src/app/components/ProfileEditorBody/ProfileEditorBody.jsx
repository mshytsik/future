import { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { scroller } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from '../../store/reducers/popupReducer';
import { edit, selectCurrentUser } from '../../store/reducers/usersReducer';
import { ThemeContext } from '../../App';
import { errorHandler } from '../../utils/utils';

import ProfileEditorSection from '../ProfileEditorSection/ProfileEditorSection';
import {
  GeneralSection,
  PasswordSection,
  AboutSection,
  ContactsSection,
  ModeratorsSection,
} from './sections';
import { Form } from '../form';
import { Button } from '../shared';

import { WINDOW_MOBILE_WIDTH } from '../../constants';

import closeIcon from '../../assets/img/icons/close.svg';
import closeIconDark from '../../assets/img/icons/theme/close.svg';

import './ProfileEditorBody.scss';
import './ProfileEditorBodyTheme.scss';

const ProfileEditorBody = ({
  sections,
  user,
  activeSection,
  setActiveSection,
  setShowHead,
}) => {
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const dispatchHide = () => dispatch(hide());

  const formTrack = useRef(null);
  const activeSectionRef = useRef(null);

  useEffect(() => {
    if (activeSection) {
      if (window.innerWidth >= WINDOW_MOBILE_WIDTH) {
        const DELTA_OFFSET = parseInt(
          getComputedStyle(formTrack.current)['padding-top']
        );

        scroller.scrollTo(activeSection, {
          duration: 300,
          smooth: true,
          containerId: 'profile-editor-body',
          offset: -DELTA_OFFSET,
        });
      } else {
        setShowHead(false);

        activeSectionRef.current
          .querySelectorAll('.form-input__input--textarea')
          .forEach((el) => el.dispatchEvent(new Event('change')));
      }
    }
  }, [activeSection]);

  const navigate = useNavigate();

  const theme = useContext(ThemeContext);

  const defaultValues = {
    type: user.type,
    photo: user.photo,
    nickname: user.nickname,
    username: user.username,
    descriptionShort: user.details.description.short,
    email: user.email,
    passwordOld: '',
    passwordNew1: '',
    passwordNew2: '',
    area: user.details.area,
    location: user.details.location,
    employees: user.type === 'company' ? user.details.employees : '',
    birthday: user.type === 'company' ? user.details.birthday : '',
    descriptionFull: user.details.description.full,
    contactEmail: user.contacts.email,
    website: user.contacts.website,
    phone: user.contacts.phone,
    telegram: user.contacts.socials.telegram,
    twitter: user.contacts.socials.twitter,
    facebook: user.contacts.socials.facebook,
    linkedin: user.contacts.socials.linkedin,
    isVerified: user.isVerified.toString(),
    isModerator: user.isModerator.toString(),
  };

  const {
    control,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: false, defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  const onError = (errors) => {
    const errorKey = Object.keys(errors)[0];
    errorHandler(errors, errorKey);
    setActiveSection(
      document.getElementsByName(errorKey)[0].closest('.pe-form__area').id
    );
  };

  const onSubmit = (data) => {
    const userData = {
      id: user.id,
      type: data.type,
      nickname: data.nickname,
      username: data.username,
      photo: data.photo,
      email: data.email,
      details: {
        area: data.area,
        location: data.location,
        description: {
          short: data.descriptionShort,
          full: data.descriptionFull,
        },
      },
      contacts: {
        email: data.contactEmail,
        website: data.website,
        phone: data.phone,
        socials: {
          telegram: data.telegram,
          facebook: data.facebook,
          twitter: data.twitter,
          linkedin: data.linkedin,
        },
      },
      isVerified: data.isVerified === 'true',
      isModerator: data.isModerator === 'true',
    };

    console.log(userData);

    if (data.type === 'company') {
      userData.details.employees = data.employees;
      userData.details.birthday = data.birthday;
    }

    if (data.passwordNew1) {
      userData.password = data.passwordNew1;
    }

    setShowHead(true);
    dispatch(edit(userData));
    dispatch(hide());
    data.nickname !== user.nickname && navigate(`/author/${userData.nickname}`);
  };

  const formSections = {
    general: (
      <GeneralSection
        user={user}
        control={control}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
      />
    ),
    password: (
      <PasswordSection
        user={user}
        control={control}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
      />
    ),
    about: (
      <AboutSection
        user={user}
        control={control}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
      />
    ),
    contacts: (
      <ContactsSection
        control={control}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
      />
    ),
  };

  if (currentUser.isModerator) {
    formSections.moderators = (
      <ModeratorsSection
        user={user}
        control={control}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
      />
    );
  }

  const formFooter = (
    <div className="pe__footer pe-footer">
      <div className="pe-footer__nav">
        <Button
          callback={dispatchHide}
          title="Cancel"
          type="secondary"
          size="md"
        />

        <Button
          callback={handleSubmit(onSubmit, onError)}
          title="Save"
          type="primary"
          size="md"
        />
      </div>
    </div>
  );

  return (
    <div className="pe-body">
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        footer={formFooter}
        bodyId="profile-editor-body"
        bodyRef={formTrack}
        className="pe-form"
      >
        <Button
          callback={dispatchHide}
          icon={{
            iconSrc: theme === 'light' ? closeIcon : closeIconDark,
            iconOnly: true,
            iconSize: 'sm',
          }}
          className="popup__close"
        />

        {sections.map((section) => (
          <ProfileEditorSection
            key={section.id}
            id={section.id}
            isActive={section.id === activeSection}
            section={section}
            setShowHead={setShowHead}
            sectionRef={section.id === activeSection ? activeSectionRef : null}
          >
            {formSections[section.id]}
          </ProfileEditorSection>
        ))}
      </Form>
    </div>
  );
};

export default ProfileEditorBody;
