import { getDateText } from '../../utils/dateTime';

import Reaction from '../Reaction/Reaction';
import { Filter } from '../shared';

import './Reactions.scss';
import './ReactionsTheme.scss';

const Reactions = ({ reactions, filter }) => {
  const reactionsBlocks = {};
  reactions
    .filter((reaction) => filter.value.includes(reaction.type))
    .sort((a, b) => Date.parse(b.actionDate) - Date.parse(a.actionDate))
    .map((reaction) => {
      reaction.actionDate in reactionsBlocks
        ? reactionsBlocks[reaction.actionDate].push(reaction)
        : (reactionsBlocks[reaction.actionDate] = [reaction]);
    });

  return (
    <div className="profile-grid__reactions profile-reactions">
      <div className="profile-reactions__grid reactions-grid">
        {Object.entries(reactionsBlocks).map(([date, items]) => (
          <div key={date} className="reactions-grid__block reactions-block">
            <p className="reactions-block__title">{getDateText(date, true)}</p>

            <div className="reactions-block__list">
              {items.map((reaction, index) => (
                <Reaction key={index} reaction={reaction} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="profile-reactions__filter reactions-filter">
        <Filter
          title="Activity"
          options={filter.options}
          setOptions={filter.setValue}
        />
      </div>
    </div>
  );
};

export default Reactions;
