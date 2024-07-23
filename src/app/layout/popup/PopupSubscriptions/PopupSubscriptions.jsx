import { useSelector } from 'react-redux';
import { selectUsers } from '../../../store/reducers/usersReducer';

import Popup from '../Popup/Popup';
import { Tabs, Subscription } from '../../../components/shared';

import './PopupSubscriptions.scss';

const PopupSubscriptions = ({ author, isActive, activeTab, setActiveTab }) => {
  const users = useSelector(selectUsers);
  const subscribers = users
    .filter((user) =>
      user.subscriptions.some(
        (subscription) => subscription.userId === author.id
      )
    )
    .map((subscriber) => subscriber.id);

  const tabs = [
    {
      name: 'Subscriptions',
      value: 'subscriptions',
      count: author.subscriptions.length,
    },
    {
      name: 'Subscribers',
      value: 'subscribers',
      count: subscribers.length,
    },
  ];

  return (
    <Popup
      isActive={isActive}
      head={{
        title: 'Users',
        headContent: (
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActive={setActiveTab}
            className="subscriptions__head"
          />
        ),
      }}
      className="popup-subscriptions"
      contentClassName="subscriptions"
    >
      <div className="subscriptions__list">
        {(activeTab === 'subscriptions'
          ? author.subscriptions.map((subscription) => subscription.userId)
          : subscribers
        ).map((item) => (
          <Subscription
            key={item}
            userId={item}
            className="subscriptions__item"
          />
        ))}
      </div>
    </Popup>
  );
};

export default PopupSubscriptions;
