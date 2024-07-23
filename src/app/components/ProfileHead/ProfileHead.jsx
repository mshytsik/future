import { useSelector, useDispatch } from 'react-redux';
import { show } from '../../store/reducers/popupReducer';
import { selectUsers } from '../../store/reducers/usersReducer';
import { selectArticles } from '../../store/reducers/articlesReducer';
import { getDeclination } from '../../utils/utils';
import { calculateUserRating } from '../../utils/utils';

import ProfileBlock from '../ProfileBlock/ProfileBlock';
import ProfileHeadNav from '../ProfileHeadNav/ProfileHeadNav';
import { Circles } from '../shared';

import './ProfileHead.scss';
import './ProfileHeadTheme.scss';

import accountIcon from '../../assets/img/icons/account.svg';
import verifyIcon from '../../assets/img/icons/verify.svg';

const ProfileHead = ({ user, setActiveTab }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const users = useSelector(selectUsers);
  const subscribers = users.filter((item) =>
    item.subscriptions.some((subscription) => subscription.userId === user.id)
  );

  const userArticles = useSelector(selectArticles).filter(
    (article) => article.author === user.id && article.status === 'publish'
  );

  return (
    <div className="profile-info__head profile-head">
      <div className="profile-head__user">
        <div className={`profile-head__photo ${user.photo ? '' : 'is-absent'}`}>
          <img src={user.photo ? user.photo : accountIcon} />
        </div>

        <div className="profile-head__basic">
          {user.username && (
            <div className="profile-head__title">
              <p>{user.username}</p>
              {user.isVerified && <img src={verifyIcon} />}
            </div>
          )}

          {user.details.description.short && (
            <p className="profile-head__subtitle">
              {user.details.description.short}
            </p>
          )}

          {(user.subscriptions.length > 0 || subscribers.length > 0) && (
            <div className="profile-head__meta">
              <p
                onClick={() => {
                  setActiveTab('subscriptions');
                  dispatchShowPopup('subscriptions');
                }}
              >
                <span>{user.subscriptions.length}</span>
                {getDeclination(user.subscriptions.length, 'Subscription||s|s')}
              </p>
              <p
                onClick={() => {
                  setActiveTab('subscribers');
                  dispatchShowPopup('subscriptions');
                }}
              >
                <span>{subscribers.length}</span>
                {getDeclination(subscribers.length, 'Subscriber||s|s')}
              </p>
            </div>
          )}
        </div>
      </div>

      <ProfileBlock
        title="Rating"
        value={calculateUserRating(userArticles)}
        reorder
        isRating
        className="profile-info__block hide-sm"
      />

      <ProfileBlock
        title="Achievements"
        reorder
        className="profile-info__block hide-sm"
      >
        <Circles items={user.medalsIcons} />
      </ProfileBlock>

      <ProfileHeadNav user={user} />
    </div>
  );
};

export default ProfileHead;
