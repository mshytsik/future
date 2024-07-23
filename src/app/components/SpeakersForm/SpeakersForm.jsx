import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/reducers/usersReducer';

import UsersSearch from '../UsersSearch/UsersSearch';
import Speaker from '../Speaker/Speaker';

import './SpeakersForm.scss';
import './SpeakersFormTheme.scss';

const SpeakersForm = ({
  articleData,
  setArticleData,
  validation,
  setValidation,
}) => {
  const [speakers, setSpeakers] = useState(articleData.speakers ?? []);

  useEffect(() => {
    setArticleData((data) => ({ ...data, speakers }));

    setValidation((prev) => ({
      isValid: {
        ...prev.isValid,
        speakers:
          !speakers.find((speaker) => speaker.topics.length === 0) &&
          speakers.filter(
            (speaker) => speaker.topics.filter((topic) => !topic).length > 0
          ).length === 0,
      },
      shouldValidate: false,
    }));
  }, [speakers]);

  const setSpeakerCallback = (speakerId) => {
    setSpeakers((prev) => [
      { id: speakerId, status: 'speaker', topics: [''] },
      ...prev,
    ]);
  };

  const users = useSelector(selectUsers);

  return (
    <div className="speakers-form">
      <p className="speakers-form__title">Add participants</p>

      <UsersSearch
        foundUsersIds={speakers.map((speaker) => speaker.id)}
        setUserCallback={setSpeakerCallback}
      />

      <div className="speakers-form__list">
        {speakers.map((speaker) => (
          <Speaker
            key={speaker.id}
            user={users.find((user) => user.id === speaker.id)}
            speakerData={speaker}
            setSpeakers={setSpeakers}
            shouldValidate={validation.shouldValidate}
          />
        ))}
      </div>
    </div>
  );
};

export default SpeakersForm;
