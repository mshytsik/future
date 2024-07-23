import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectUserByNickname,
} from '../../store/reducers/usersReducer';

import ErrorPage from '../ErrorPage/ErrorPage';
import Profile from '../../components/Profile/Profile';
import PopupSubscriptions from '../../layout/popup/PopupSubscriptions/PopupSubscriptions';
import PopupEmployees from '../../layout/popup/PopupEmployees/PopupEmployees';
import ProfileEditor from '../../layout/popup/ProfileEditor/ProfileEditor';

const ProfilePage = ({ activePopup }) => {
  const { nickname } = useParams();
  const author = useSelector(selectUserByNickname(nickname));

  if (!author) {
    return <ErrorPage />;
  }

  let currentUser = useSelector(selectCurrentUser);

  const [subscriptionsTab, setSubscriptionsTab] = useState('subscriptions');

  return (
    <>
      <Profile author={author} setActiveTab={setSubscriptionsTab} />

      <PopupSubscriptions
        author={author}
        isActive={activePopup === 'subscriptions'}
        activeTab={subscriptionsTab}
        setActiveTab={setSubscriptionsTab}
      />

      {(currentUser?.isModerator || currentUser?.id === author.id) && (
        <ProfileEditor
          isActive={activePopup === 'profile-editor'}
          userId={author.id}
        />
      )}

      {currentUser?.isModerator && author.type === 'company' && (
        <PopupEmployees isActive={activePopup === 'employees'} user={author} />
      )}
    </>
  );
};

export default ProfilePage;
