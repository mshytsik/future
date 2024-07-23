import { useState, useEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers } from '../../store/reducers/usersReducer';
import { selectActivePopup, show } from '../../store/reducers/popupReducer';
import { useOnResize } from '../../hooks';

import { User } from '../shared';
import PopupSpeakerTopics from '../../layout/popup/PopupSpeakerTopics/PopupSpeakerTopics';

import './SpeakersList.scss';
import './SpeakersListTheme.scss';

const SpeakersList = ({
  speakers,
  title = '',
  showTopics = false,
  isCollapsable = false,
  className = '',
}) => {
  const users = useSelector(selectUsers);

  const navigate = useNavigate();

  const speakersRef = useRef(null);

  const [showSpeakers, setShowSpeakers] = useState(false);

  const handleShowSpeakers = (e) => {
    e.preventDefault();
    setShowSpeakers((prev) => !prev);
  };

  const handleResize = () => {
    if (isCollapsable) {
      const speakersBody = speakersRef.current;
      const speakersElements = speakersRef.current.querySelectorAll('.user');

      if (speakersElements.length) {
        const hideClassList = ['is-hidden', 'hide'];
        speakersElements.forEach((item) =>
          item.classList.remove(...hideClassList)
        );
        hideClassList.forEach((className) => {
          Array.from(speakersElements)
            .reverse()
            .forEach(
              (item) =>
                speakersBody.scrollWidth >
                  Math.ceil(speakersBody.offsetWidth) &&
                item.classList.add(className)
            );
        });
      }
    }
  };

  useOnResize(handleResize);

  useEffect(() => {
    if (isCollapsable) {
      const speakersElements = speakersRef.current.querySelectorAll('.user');

      if (speakersElements.length) {
        showSpeakers
          ? speakersElements.forEach((item) =>
              item.classList.remove('is-hidden', 'hide')
            )
          : handleResize();
      }
    }
  }, [showSpeakers]);

  const activePopup = useSelector(selectActivePopup);
  const dispatch = useDispatch();

  const [speakerToShow, setSpeakerToShow] = useState(null);
  useEffect(() => {
    activePopup === '' && setSpeakerToShow(null);
  }, [activePopup]);

  return (
    speakers.length > 0 && (
      <div className={`speakers ${className}`}>
        {title && <p className="speakers__title">{title}</p>}

        <div
          className={`speakers__list ${
            isCollapsable ? 'speakers__list--collapsable' : ''
          } ${isCollapsable && showSpeakers ? 'show-all' : ''}`}
          ref={speakersRef}
        >
          {speakers.map((speaker) => {
            const user = users.find((user) => user.id === speaker.id);

            return (
              <Fragment key={speaker.id}>
                <User
                  user={user}
                  splitTitle={!showTopics}
                  subtitle={showTopics ? 'Topics' : null}
                  callback={(e) => {
                    e.preventDefault();
                    navigate(`/author/${user.nickname}`);
                  }}
                  subtitleCallback={() => {
                    dispatch(show('speaker-topics'));
                    setSpeakerToShow(
                      speakers.find((item) => item.id === speaker.id)
                    );
                  }}
                  verifyNearTitle={showTopics}
                  className="speakers__item user--link"
                />

                {showTopics && (
                  <PopupSpeakerTopics
                    isActive={
                      activePopup.id === 'speaker-topics' &&
                      speaker.id === speakerToShow?.id
                    }
                    speakerId={speaker.id}
                    topics={speaker.topics}
                  />
                )}
              </Fragment>
            );
          })}

          {isCollapsable && (
            <div
              className="speakers__item speakers__item--more"
              onClick={handleShowSpeakers}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SpeakersList;
