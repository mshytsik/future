import { useState, useEffect } from 'react';

import { FormList } from '../form';
import { Button, Select, User } from '../shared';

import removeIcon from '../../assets/img/icons/close-red.svg';

import './Speaker.scss';
import './SpeakerTheme.scss';

const Speaker = ({ user, speakerData, setSpeakers, shouldValidate }) => {
  const [speakerStatus, setSpeakerStatus] = useState(speakerData.status);
  const [topics, setTopics] = useState(speakerData.topics ?? []);

  useEffect(() => {
    setSpeakers((speakers) =>
      speakers.map((speaker) =>
        speaker.id === speakerData.id
          ? { ...speaker, status: speakerStatus, topics }
          : speaker
      )
    );
  }, [speakerStatus, topics]);

  return (
    <div className="speaker">
      <div className="speaker__head">
        <User
          user={user}
          subtitle={user.details.area}
          callback={() => window.open(`/author/${user.nickname}`, '_blank')}
          verifyNearTitle
        />

        <div className="speaker__nav">
          <Button
            callback={() =>
              setSpeakers((speakers) =>
                speakers.filter((speaker) => speaker.id !== speakerData.id)
              )
            }
            title="Remove"
            icon={{
              iconSrc: removeIcon,
            }}
            type="secondary"
            size="md"
            className="speaker__remove"
          />

          <Select
            options={[
              { id: 'speaker', name: 'Speaker' },
              { id: 'organizer', name: 'Organizer' },
            ]}
            value={speakerStatus}
            setOptionValue={setSpeakerStatus}
            className="speaker__type"
          />
        </div>
      </div>

      <FormList
        items={topics}
        setItems={setTopics}
        max={5}
        name="speaker"
        placeholder="Add a topic"
        buttonPlaceholder="Add topics"
        shouldValidate={shouldValidate}
      />
    </div>
  );
};

export default Speaker;
