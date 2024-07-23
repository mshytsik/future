import { useState, useContext } from 'react';
import { ThemeContext } from '../../App';

import ProfileHead from '../ProfileHead/ProfileHead';
import ProfileBody from '../ProfileBody/ProfileBody';

import { Button } from '../shared';

import './ProfileInfo.scss';
import './ProfileInfoTheme.scss';

import chevronIcon from '../../assets/img/icons/chevron-d.svg';
import chevronIconDark from '../../assets/img/icons/theme/chevron-d.svg';

const ProfileInfo = ({ user, className, setActiveTab }) => {
  const theme = useContext(ThemeContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isShort, setIsShort] = useState(false);

  return (
    <div
      className={`profile-info ${className} ${
        user.details.description.full ? '' : 'no-description"'
      } ${isShort ? 'is-short' : ''} ${isExpanded ? 'is-expanded' : ''}`}
    >
      <ProfileHead user={user} setActiveTab={setActiveTab} />

      <ProfileBody
        user={user}
        expand={{ value: isExpanded, setValue: setIsExpanded }}
        short={{ value: isShort, setValue: setIsShort }}
      />

      <div className="profile-info__toggle">
        <Button
          callback={() => setIsExpanded(true)}
          title="Show more"
          type="secondary"
          size="sm"
          isSquare
        >
          {<img src={theme === 'light' ? chevronIcon : chevronIconDark} />}
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
