import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTerms } from '../../store/reducers/articlesReducer';
import { selectUsers } from '../../store/reducers/usersReducer';
import { getDeclination } from '../../utils/utils';
import { getDateText, getTimeText } from '../../utils/dateTime';
import { useOnResize } from '../../hooks';

import { User, Tag } from '../shared';
import ArticleNav from '../ArticleNav/ArticleNav';
import SpeakersList from '../SpeakersList/SpeakersList';

import eventsIcon from '../../assets/img/icons/events.svg';
import timeIcon from '../../assets/img/icons/time.svg';
import worldIcon from '../../assets/img/icons/world.svg';
import pinIcon from '../../assets/img/icons/pin.svg';
import subscribeIcon from '../../assets/img/icons/subscribe.svg';

import '../Article/Article.scss';
import '../Article/ArticleTheme.scss';
import './Conference.scss';
import './ConferenceTheme.scss';

const Conference = ({ article, className = '' }) => {
  const navigate = useNavigate();

  const users = useSelector(selectUsers);
  const author = users.find((user) => user.id === article.author);

  const dates = {
    start: article.dateTime.start.split('T')[0],
    end: article.dateTime.end.split('T')[0],
  };

  let conferenceDate =
    dates.start !== dates.end
      ? `${getDateText(article.dateTime.start, false, false)} - ${getDateText(
          article.dateTime.end
        )}`
      : getDateText(article.dateTime.start);

  let conferenceTime = getTimeText(
    article.dateTime.start,
    dates.start === dates.end ? article.dateTime.end : false
  );

  const categories = useSelector(selectTerms('conference', 'categories'));
  const articleCategory = categories.find(
    (category) => article.category === category.id
  );

  const [showArticleNav, setShowArticleNav] = useState(true);

  const footerRef = useRef(null);
  const footerMetaRef = useRef(null);

  const handleResize = () => {
    const NAV_BODY_WIDTH = 120;
    setShowArticleNav(
      footerRef.current.offsetWidth - footerMetaRef.current.offsetWidth <
        NAV_BODY_WIDTH
    );
  };

  useOnResize(handleResize);

  const speakers = article.speakers.filter(
    (speaker) => speaker.status === 'speaker'
  );

  return (
    <Link
      to={`/conference/${article.id}`}
      className={`article article--conf ${
        article.speakers.length ? '' : 'article--conf-no-speakers'
      } ${className}`}
    >
      {article.image && (
        <div className="article__image">
          <img src={article.image} />
        </div>
      )}

      <div className="article__content">
        <div className="article__header">
          {article.speakers.length ? (
            <>
              <User
                user={author}
                title=""
                subtitle={author.username}
                className="article__meta user--link"
                callback={(e) => {
                  e.preventDefault();
                  navigate(`/author/${author.nickname}`);
                }}
              />

              <p className="article__meta article__date">{conferenceDate}</p>
            </>
          ) : (
            <>
              <div className="article__meta article__meta--date">
                <img src={eventsIcon} />
                <p>{conferenceDate}</p>
              </div>

              <div className="article__meta">
                <img src={timeIcon} />
                <p>{conferenceTime}</p>
              </div>

              <div className="article__meta">
                <img src={pinIcon} />
                <p>
                  {article.details.format === 'online' ? 'Online' : 'Offline'}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="article__body">
          <p className="article__title">{article.title}</p>

          {speakers.length ? (
            <SpeakersList
              speakers={speakers}
              title="Speakers"
              isCollapsable
              className="article__speakers"
            />
          ) : (
            <p className="article__subtitle">{article.description}</p>
          )}
        </div>

        <div className="article__footer" ref={footerRef}>
          <div className="article__footer-meta" ref={footerMetaRef}>
            {article.speakers.length ? (
              <>
                <div className="article__meta article__meta--date">
                  <img src={timeIcon} />
                  <p>{conferenceTime}</p>
                </div>

                {article.details.format === 'offline' &&
                  article.details.address && (
                    <div className="article__meta">
                      <img src={worldIcon} />
                      <p>{article.details.address}</p>
                    </div>
                  )}

                {article.details.listeners > 0 && (
                  <div className="article__meta">
                    <img
                      className="hide-xl hide-lg hide-md hide-sm"
                      src={subscribeIcon}
                    />
                    <p>
                      {`${article.details.listeners} ${getDeclination(
                        article.details.listeners,
                        'participant||s|s'
                      )}`}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {articleCategory && (
                  <div className="article__meta article__meta--tags">
                    <Tag
                      tag={{ type: 'conference', ...articleCategory }}
                      type="category"
                    />
                  </div>
                )}

                {article.minutesToReads && (
                  <p className="article__meta article__time">
                    {`${article.minutesToRead} ${getDeclination(
                      article.minutesToRead,
                      'minute||s|s'
                    )} to read`}
                  </p>
                )}
              </>
            )}
          </div>

          <ArticleNav
            article={article}
            isHidden={showArticleNav}
            className="article__nav"
          />
        </div>
      </div>
    </Link>
  );
};

export default Conference;
