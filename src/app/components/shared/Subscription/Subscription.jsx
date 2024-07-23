import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  selectCurrentUser,
} from '../../../store/reducers/usersReducer';
import { show, hide } from '../../../store/reducers/popupReducer';
import { useSubscribe } from '../../../hooks';

import User from '../User/User';
import Button from '../Button/Button';

import './Subscription.scss';
import './SubscriptionTheme.scss';

const Subscription = ({ userId, className = '' }) => {
  const user = useSelector(selectUser(userId));
  const currentUser = useSelector(selectCurrentUser);

  const isSubscribed = currentUser
    ? currentUser.subscriptions.some(
        (subscription) => subscription.userId === user.id
      )
    : false;
  const handleSubscribe = useSubscribe(currentUser, user, isSubscribed);

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const navigate = useNavigate();

  return (
    <div className={`subscription ${className}`}>
      <User
        user={user}
        title={user.username}
        subtitle={user.details.area}
        callback={() => {
          dispatch(hide());
          navigate(`/author/${user.nickname}`);
        }}
        verifyNearTitle
        className="subscription__user user--link"
      />

      {user.id !== currentUser?.id && (
        <Button
          callback={() =>
            currentUser ? handleSubscribe() : dispatchShowPopup('login')
          }
          title={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          type="primary"
          size="sm"
          className={`subscription__button ${isSubscribed ? 'is-active' : ''}`}
        />
      )}
    </div>
  );
};

export default Subscription;
