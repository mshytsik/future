import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectCurrentUser,
} from '../../store/reducers/usersReducer';
import { selectArticle } from '../../store/reducers/articlesReducer';
import { useSubscribe } from '../../hooks';
import { getRandomColorName } from '../../utils/random';
import { getTimeAgo } from '../../utils/dateTime';

import { Button } from '../shared';

import heart from '../../assets/img/icons/heart-red.svg';
import subscribe from '../../assets/img/icons/subscribe.svg';

import './Reaction.scss';
import './ReactionTheme.scss';

const Reaction = ({ reaction }) => {
  const user = useSelector(selectUser(reaction.userId));
  const currentUser = useSelector(selectCurrentUser);

  const isSubscribed = currentUser
    ? currentUser.subscriptions.some(
        (subscription) => subscription.userId === user.id
      )
    : false;
  const handleSubscribe = useSubscribe(currentUser, user, isSubscribed);

  const article = useSelector(selectArticle(reaction?.articleId));

  return (
    <div className="reaction">
      <div className="reaction__icons reaction-icons">
        <div className="reaction-icons__icon">
          <img src={reaction.type === 'like' ? heart : subscribe} />
        </div>

        <Link
          to={`/author/${user.nickname}`}
          className={`reaction-icons__user-photo color--${getRandomColorName()}`}
        >
          {user.photo ? (
            <img src={user.photo} />
          ) : (
            <p>
              {user.username
                .split(' ')
                .map((item) => item[0])
                .join('')}
            </p>
          )}
        </Link>
      </div>

      <div className="reaction__content">
        <div className="reaction__body reaction-body">
          <div className="reaction-body__main">
            <div className="reaction-body__meta">
              <Link to={`/author/${user.nickname}`}>{user.username}</Link>
              <p>{getTimeAgo(reaction.actionDate)}</p>
            </div>

            <div className="reaction-body__event reaction-event">
              <p className="reaction-event__main">
                {reaction.type === 'like' ? (
                  <>
                    liked
                    <Link to={`/${article.type}/${article.id}`}>
                      {article.title}
                    </Link>
                  </>
                ) : (
                  'subscribed to you'
                )}
              </p>
            </div>
          </div>

          <div className="reaction-body__sidebar reaction-sidebar">
            {reaction.type === 'like' ? (
              <Link
                to={`/${article.type}/${article.id}`}
                className="reaction-sidebar__post"
              >
                <img src={article.image} />
              </Link>
            ) : (
              <Button
                callback={handleSubscribe}
                title={isSubscribed ? 'Subscribed' : 'Subscribe'}
                type="primary"
                size="md"
                className={`reaction-sidebar__subscribe ${
                  isSubscribed ? 'is-active' : ''
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reaction;
