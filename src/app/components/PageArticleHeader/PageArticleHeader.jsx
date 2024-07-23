import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  selectCurrentUser,
} from '../../store/reducers/usersReducer';
import { show } from '../../store/reducers/popupReducer';
import { ThemeContext } from '../../App';
import { useSubscribe } from '../../hooks';
import { getDeclination } from '../../utils/utils';
import { getDateText } from '../../utils/dateTime';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import PageArticleNav from '../PageArticleNav/PageArticleNav';
import SpeakersList from '../SpeakersList/SpeakersList';
import { User, Button } from '../shared';

import followIcon from '../../assets/img/icons/follow.svg';
import followIconDark from '../../assets/img/icons/theme/follow.svg';
import unfollowIcon from '../../assets/img/icons/unfollow.svg';
import unfollowIconDark from '../../assets/img/icons/theme/unfollow.svg';

import './PageArticleHeader.scss';
import './PageArticleHeaderTheme.scss';

const PageArticleHeader = ({
  article,
  isPreview = false,
  isKnowledgeArticle = false,
}) => {
  const users = useSelector(selectUsers);
  const author = users.find((user) => user.id === article.author);
  const currentUser = useSelector(selectCurrentUser);

  const authorMeta = [];
  if (article.minutesToRead) {
    authorMeta.push(
      `${article.minutesToRead} ${getDeclination(
        article.minutesToRead,
        'minute||s|s'
      )} to read`
    );
  }
  if (article.type === 'post') {
    authorMeta.push(getDateText(article.dateTime));
  } else if (article.details.listeners > 0) {
    authorMeta.push(
      `${article.details.listeners} ${getDeclination(
        article.details.listeners,
        'participant||s|s'
      )}`
    );
  }

  const isSubscribed = currentUser
    ? currentUser.subscriptions.some(
        (subscription) => subscription.userId === author.id
      )
    : false;

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const handleSubscribe = !isPreview
    ? useSubscribe(currentUser, author, isSubscribed)
    : () => {};

  const navigate = useNavigate();

  const theme = useContext(ThemeContext);

  const followIconThemed = theme === 'light' ? followIcon : followIconDark;
  const unfollowIconThemed =
    theme === 'light' ? unfollowIcon : unfollowIconDark;

  return (
    <div className="pa-header">
      {!isPreview && article.type === 'conference' && (
        <Breadcrumbs
          items={[
            { link: '/conferences', name: 'Conferences and events' },
            { name: article.title },
          ]}
        />
      )}

      {!isPreview && <h1 className="pa-header__title">{article.title}</h1>}

      {!isKnowledgeArticle && (
        <>
          <div
            className={`pa-header__user ${
              isPreview ? 'pa-header__user--disabled' : ''
            }`}
          >
            <User
              user={author}
              title={author.username}
              callback={
                !isPreview ? () => navigate(`/author/${author.nickname}`) : null
              }
              verifyNearTitle
              meta={authorMeta}
              className="user--link"
            />

            {(currentUser !== author || isPreview) && (
              <Button
                callback={() =>
                  currentUser ? handleSubscribe() : dispatchShowPopup('login')
                }
                icon={{
                  iconSrc: isSubscribed ? unfollowIconThemed : followIconThemed,
                }}
                type="primary"
                size="md"
                className={isSubscribed ? 'is-active' : ''}
              >
                <p className="button__title">
                  {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                </p>
              </Button>
            )}
          </div>

          <PageArticleNav
            article={article}
            isConferenceHead={article.type === 'conference'}
            disableActions={isPreview}
            className="pa-header__nav"
          />
        </>
      )}

      {article.status === 'rejected' && article.moderationNote && (
        <div className="pa-header__moderation moderation">
          <p className="moderation__title">Reason for rejection:</p>

          <div className="moderation__message">
            {article.moderationNote.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {article.image && (
        <div className="pa-header__image">
          <img src={article.image} />
        </div>
      )}

      {article.type === 'conference' && (
        <SpeakersList
          speakers={article.speakers.filter(
            (speaker) => speaker.status === 'speaker'
          )}
          title="Speakers"
          showTopics
        />
      )}
    </div>
  );
};

export default PageArticleHeader;
