import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/reducers/usersReducer';
import { edit } from '../../store/reducers/articlesReducer';
import { show } from '../../store/reducers/popupReducer';
import { ThemeContext } from '../../App';
import {
  useArticleFavorite,
  useArticleShare,
  useArticleLike,
} from '../../hooks';
import {
  getDate,
  getDateText,
  getTimeText,
  getTimezone,
} from '../../utils/dateTime';

import calendarIcon from '../../assets/img/icons/calendar-add.svg';
import favoriteIcon from '../../assets/img/icons/favorite.svg';
import favoriteOnIcon from '../../assets/img/icons/favorite-on.svg';
import favoriteOnIconDark from '../../assets/img/icons/theme/favorite-on.svg';
import shareIcon from '../../assets/img/icons/share.svg';
import heartIcon from '../../assets/img/icons/heart.svg';
import heartOnIcon from '../../assets/img/icons/heart-on.svg';
import heartOnIconDark from '../../assets/img/icons/theme/heart-on.svg';
import eventsIcon from '../../assets/img/icons/events.svg';
import timeIcon from '../../assets/img/icons/time.svg';
import worldIcon from '../../assets/img/icons/world.svg';
import pinIcon from '../../assets/img/icons/pin.svg';
import publishIcon from '../../assets/img/icons/publish.svg';
import unpublishIcon from '../../assets/img/icons/unpublish.svg';

import './PageArticleNav.scss';
import './PageArticleNavTheme.scss';

const PageArticleNav = ({
  article,
  isConferenceHead = false,
  disableActions = false,
  className,
}) => {
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const getCalendarLink = () => {
    const dates = {
      timezone: getTimezone(article.dateTime.start).longName ?? 'UCT',
    };

    ['start', 'end'].map((dateName) => {
      if (dateName in article.dateTime) {
        dates[dateName] = getDate(article.dateTime[dateName]);
        dates[dateName].result =
          `${dates[dateName].date}T${dates[dateName].time}`;
      } else {
        dates.end = dates.start;
      }
    });

    let details = `${
      article.details.format[0].toUpperCase() + article.details.format.slice(1)
    } conference at FUTURE.`;
    if (article.details.format === 'online' && article.details.conferenceLink) {
      details += ` Conference link: ${article.details.conferenceLink}`;
    }

    let url = `http://www.google.com/calendar/render?action=TEMPLATE&text=${article.title}&dates=${dates.start.result}/${dates.end.result}&ctz=${dates.timezone}&details=${details}`;
    if (article.details.format === 'offline') {
      url += `&location=${article.details.address.replace(' ', '+')}`;
    }

    return encodeURI(url);
  };

  const isFavorite = currentUser
    ? currentUser.favorite.includes(article.id)
    : false;
  const handleFavorite = !disableActions
    ? useArticleFavorite(article, currentUser, isFavorite)
    : () => {};

  const handleShare = useArticleShare(article);

  const hasLike = currentUser
    ? article.stats.liked.some((liked) => liked.userId === currentUser.id)
    : false;
  const handleLike = !disableActions
    ? useArticleLike(article, currentUser, hasLike)
    : () => {};

  const theme = useContext(ThemeContext);

  let conferenceDate;
  let conferenceTime;
  if (isConferenceHead) {
    const dates = {
      start: article.dateTime.start.split('T')[0],
      end: article.dateTime.end.split('T')[0],
    };

    conferenceDate =
      dates.start !== dates.end
        ? `${getDateText(article.dateTime.start, false, false)} - ${getDateText(
            article.dateTime.end
          )}`
        : getDateText(article.dateTime.start);

    conferenceTime = getTimeText(
      article.dateTime.start,
      dates.start === dates.end ? article.dateTime.end : false
    );
  }

  const handleUpdateStatus = (status) => {
    status === 'publish'
      ? dispatch(edit({ id: article.id, status: 'publish' }))
      : dispatchShowPopup({ id: 'moderation-note', data: article });

    document.querySelector('.main-body__content').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className={`pa-nav ${className} ${
        isConferenceHead ? 'pa-nav--conference-head' : ''
      } ${disableActions ? 'pa-nav--disabled' : ''}`}
    >
      <div className="pa-nav__meta pa-meta">
        {!isConferenceHead ? (
          <div className="pa-meta__item">
            <img src={heartIcon} />
            <p>{article.stats.liked.length}</p>
          </div>
        ) : (
          <>
            {article.dateTime.start && (
              <>
                <div className="pa-meta__item">
                  <img src={eventsIcon} />
                  <p>{conferenceDate}</p>
                </div>

                <div className="pa-meta__item">
                  <img src={timeIcon} />
                  <p>{conferenceTime}</p>
                </div>
              </>
            )}

            {article.details.format === 'offline' ? (
              article.details.address && (
                <div className="pa-meta__item">
                  <img src={pinIcon} />
                  <p>{article.details.address}</p>
                </div>
              )
            ) : (
              <div className="pa-meta__item">
                <img src={worldIcon} />
                <p>Online</p>
              </div>
            )}
          </>
        )}
      </div>

      {!isConferenceHead && (
        <div className="pa-nav__actions pa-actions">
          {article.type === 'conference' && (
            <Link
              to={getCalendarLink()}
              target="_blank"
              className="pa-actions__button"
            >
              <img src={calendarIcon} />
            </Link>
          )}

          {currentUser?.isModerator && article.status === 'pending' ? (
            <>
              <div
                className="pa-actions__button"
                onClick={() => handleUpdateStatus('publish')}
              >
                <img src={publishIcon} />
              </div>

              <div
                className="pa-actions__button"
                onClick={() => handleUpdateStatus('unpublish')}
              >
                <img src={unpublishIcon} />
              </div>
            </>
          ) : (
            <>
              <div
                className="pa-actions__button"
                onClick={() =>
                  currentUser ? handleFavorite() : dispatchShowPopup('login')
                }
              >
                <img
                  src={
                    isFavorite
                      ? theme === 'light'
                        ? favoriteOnIcon
                        : favoriteOnIconDark
                      : favoriteIcon
                  }
                />
              </div>

              <div
                className="pa-actions__button"
                onClick={!disableActions ? handleShare : null}
              >
                <img src={shareIcon} />
              </div>

              <div
                className="pa-actions__button"
                onClick={() =>
                  currentUser ? handleLike() : dispatchShowPopup('login')
                }
              >
                <img
                  src={
                    hasLike
                      ? theme === 'light'
                        ? heartOnIcon
                        : heartOnIconDark
                      : heartIcon
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PageArticleNav;
