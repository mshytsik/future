import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/reducers/usersReducer';

import Popup from '../Popup/Popup';

import './PopupSpeakerTopics.scss';
import './PopupSpeakerTopicsTheme.scss';

const PopupSpeakerTopics = ({ isActive, speakerId, topics = [] }) => {
  const speaker = useSelector(selectUser(speakerId));

  return (
    <Popup
      isActive={isActive}
      head={{ title: `Topics by ${speaker.username}` }}
    >
      <ol className="speaker-topics">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ol>
    </Popup>
  );
};

export default PopupSpeakerTopics;
