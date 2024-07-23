import { useState, useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUsers } from '../../store/reducers/usersReducer';
import { selectArticles } from '../../store/reducers/articlesReducer';
import { ThemeContext } from '../../App';
import { getDateText } from '../../utils/dateTime';
import { calculateUserRating } from '../../utils/utils';
import { useOnResize } from '../../hooks';

import { Link } from 'react-router-dom';
import ProfileBlock from '../ProfileBlock/ProfileBlock';
import { Button, Circles, User } from '../shared';

import { WINDOW_MOBILE_WIDTH } from '../../constants';

import './ProfileBody.scss';

import chevronIcon from '../../assets/img/icons/chevron-d.svg';
import chevronIconDark from '../../assets/img/icons/theme/chevron-d.svg';
import telegramIcon from '../../assets/img/icons/tg.svg';
import twitterIcon from '../../assets/img/icons/tw.svg';
import facebookIcon from '../../assets/img/icons/fb.svg';
import linkedinIcon from '../../assets/img/icons/in.svg';

const SOCIAL_ICONS = {
  telegram: telegramIcon,
  facebook: twitterIcon,
  twitter: facebookIcon,
  linkedin: linkedinIcon,
};

const ProfileBody = ({ user, expand, short }) => {
  const theme = useContext(ThemeContext);

  const profileBody = useRef(null);
  const descriptionBlock = useRef(null);
  const bodyBlocks = useRef(null);
  const bodyBlocksTrack = useRef(null);

  const initialHeight = { value: '', prev: '' };
  const [profileBodyHeight, setProfileBodyHeight] = useState(initialHeight);
  const [descriptionBlockHeight, setDescriptionBlockHeight] =
    useState(initialHeight);
  const [bodyBlocksHeight, setBodyBlocksHeight] = useState(initialHeight);

  const isShortBody = () => {
    let isShort = true;

    if (window.innerWidth >= WINDOW_MOBILE_WIDTH) {
      if (
        descriptionBlock.current.scrollHeight >
          descriptionBlock.current.offsetHeight ||
        bodyBlocksTrack.current.scrollHeight >
          bodyBlocksTrack.current.offsetHeight
      ) {
        isShort = false;
      }
    } else if (
      profileBody.current.scrollHeight > profileBody.current.offsetHeight
    ) {
      isShort = false;
    }
    return isShort;
  };

  const handleResize = () => !expand.value && short.setValue(isShortBody());

  useOnResize(handleResize);

  useEffect(() => {
    if (window.innerWidth >= WINDOW_MOBILE_WIDTH) {
      let fullHeight = 0;

      [descriptionBlock, bodyBlocks].map((block) => {
        let height = block.current.scrollHeight;
        if (block === bodyBlocks) {
          height +=
            bodyBlocksTrack.current.scrollHeight -
            bodyBlocksTrack.current.offsetHeight;
        }
        fullHeight = fullHeight < height ? height : fullHeight;
      });

      setDescriptionBlockHeight(
        expand.value
          ? { value: fullHeight, prev: descriptionBlock.current.offsetHeight }
          : (prevState) => ({ value: prevState.prev, prev: '' })
      );
      setBodyBlocksHeight(
        expand.value
          ? { value: fullHeight, prev: bodyBlocks.current.offsetHeight }
          : (prevState) => ({ value: prevState.prev, prev: '' })
      );
    } else {
      setProfileBodyHeight(
        expand.value
          ? {
              value: profileBody.current.scrollHeight,
              prev: profileBody.current.offsetHeight,
            }
          : (prevState) => ({ value: prevState.prev, prev: '' })
      );
    }
  }, [expand.value]);

  useEffect(() => {
    expand.setValue(false);
    short.setValue(isShortBody());

    setProfileBodyHeight({ value: '', prev: '' });
    setDescriptionBlockHeight({ value: '', prev: '' });
    setBodyBlocksHeight({ value: '', prev: '' });
  }, [user]);

  const registerDate = getDateText(user.registerDate, true);

  const users = useSelector(selectUsers);

  const userArticles = useSelector(selectArticles).filter(
    (article) => article.author === user.id && article.status === 'publish'
  );

  const navigate = useNavigate();

  const socials = Object.entries(user.contacts.socials).filter(
    ([, value]) => value.length
  );

  return (
    <div
      className="profile-info__body profile-body"
      style={{ height: profileBodyHeight.value }}
      ref={profileBody}
    >
      <div
        className="profile-body__description"
        style={{ height: descriptionBlockHeight.value }}
        ref={descriptionBlock}
      >
        {user.details.description.full && (
          <>
            <ProfileBlock
              title="Description"
              value={user.details.description.full}
              className="profile-info__block"
            />

            <div className="profile-info__toggle">
              <Button
                callback={() => expand.setValue(false)}
                title="Collapse"
                type="secondary"
                size="sm"
                isSquare
              >
                <img src={theme === 'light' ? chevronIcon : chevronIconDark} />
              </Button>
            </div>
          </>
        )}
      </div>

      <div
        className="profile-body__blocks body-blocks"
        ref={bodyBlocks}
        style={{ height: bodyBlocksHeight.value }}
      >
        <div className="body-blocks__track" ref={bodyBlocksTrack}>
          <div className="body-blocks__shorts row">
            <ProfileBlock
              title="Rating"
              value={calculateUserRating(userArticles)}
              reorder
              isRating
              className="profile-info__block col col-md-6 hide-xl hide-lg hide-md hide-xs"
            />

            <ProfileBlock
              title="Achievements"
              reorder
              className="profile-info__block col col-md-6 hide-xl hide-lg hide-md hide-xs"
            >
              <Circles items={user.medalsIcons} />
            </ProfileBlock>

            {user.contacts.email && (
              <ProfileBlock
                title="Email"
                className="profile-info__block col col col-4 col-lg-6"
              >
                <div className="profile-block__value">
                  <Link to={`mailto:${user.contacts.email}`} target="_blank">
                    {user.contacts.email}
                  </Link>
                </div>
              </ProfileBlock>
            )}

            {user.contacts.website && (
              <ProfileBlock
                title="Website"
                className="profile-info__block col col col-4 col-lg-6"
              >
                <div className="profile-block__value">
                  <Link to={user.contacts.website} target="_blank">
                    {user.contacts.website}
                  </Link>
                </div>
              </ProfileBlock>
            )}

            {user.details.area && (
              <ProfileBlock
                title={user.type === 'person' ? 'Specialization' : 'Industry'}
                value={user.details.area}
                className="profile-info__block col col col-4 col-lg-6"
              />
            )}

            {user.contacts.phone && (
              <ProfileBlock
                title="Phone"
                className="profile-info__block col col col-4 col-lg-6"
              >
                <div className="profile-block__value">
                  <Link
                    to={`tel:${user.contacts.phone.replace(/[^0-9+]+/g, '')}`}
                  >
                    {user.contacts.phone}
                  </Link>
                </div>
              </ProfileBlock>
            )}

            {user.details.location && (
              <ProfileBlock
                title="Location"
                value={user.details.location}
                className="profile-info__block col col col-4 col-lg-6"
              />
            )}

            {user.type === 'company' && (
              <>
                {user.details.employees && (
                  <ProfileBlock
                    title="Employees"
                    value={user.details.employees}
                    className="profile-info__block col col col-4 col-lg-6"
                  />
                )}

                {user.details.birthday && (
                  <ProfileBlock
                    title="Foundation date"
                    value={getDateText(user.details.birthday, true)}
                    className="profile-info__block col col col-4 col-lg-6"
                  />
                )}
              </>
            )}

            {registerDate && (
              <ProfileBlock
                title="Registration date"
                value={registerDate}
                className="profile-info__block col col col-4 col-lg-6"
              />
            )}
          </div>

          {user.type === 'company' && user.registeredEmployees && (
            <ProfileBlock title="Team" className="profile-info__block">
              <div className="body-blocks__team">
                {user.registeredEmployees.map((employeeId) => {
                  const user = users.find((user) => user.id === employeeId);

                  return (
                    <User
                      key={user.id}
                      user={user}
                      title={user.username}
                      splitTitle
                      callback={() => navigate(`/author/${user.nickname}`)}
                      className="user--link"
                    />
                  );
                })}
              </div>
            </ProfileBlock>
          )}
        </div>

        {socials.length > 0 && (
          <div className="profile-body__socials">
            {socials.map(([key, link]) => (
              <Link key={key} to={link} target="_blank">
                <img src={SOCIAL_ICONS[key]} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBody;
