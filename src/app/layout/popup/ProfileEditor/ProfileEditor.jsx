import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectCurrentUser,
} from '../../../store/reducers/usersReducer';

import Popup from '../Popup/Popup';
import ProfileEditorHead from '../../../components/ProfileEditorHead/ProfileEditorHead';
import ProfileEditorBody from '../../../components/ProfileEditorBody/ProfileEditorBody';

import './ProfileEditor.scss';

const ProfileEditor = ({ isActive, userId }) => {
  const currentUser = useSelector(selectCurrentUser);
  const user = useSelector(selectUser(userId));

  const SECTIONS = [
    { id: 'general', title: 'General information' },
    {
      id: 'about',
      title: user?.type === 'company' ? 'About company' : 'About yourself',
    },
    { id: 'contacts', title: 'Contacts' },
  ];

  if (currentUser.id === user.id) {
    SECTIONS.splice(1, 0, { id: 'password', title: 'Password' });
  }

  if (currentUser.isModerator) {
    SECTIONS.push({ id: 'moderators', title: 'For moderators' });
  }

  const [section, setSection] = useState('');
  const [showHead, setShowHead] = useState(true);

  return (
    <Popup
      isActive={isActive}
      className="profile-editor"
      contentClassName="profile-editor__content"
      useBodyWrap={false}
    >
      <ProfileEditorHead
        sections={SECTIONS}
        user={user}
        setActiveSection={setSection}
        className={showHead ? '' : 'is-hidden'}
      />

      <ProfileEditorBody
        sections={SECTIONS}
        user={user}
        activeSection={section}
        setActiveSection={setSection}
        setShowHead={setShowHead}
      />
    </Popup>
  );
};

export default ProfileEditor;
