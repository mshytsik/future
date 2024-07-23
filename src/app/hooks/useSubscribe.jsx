import { useDispatch } from 'react-redux';
import { edit } from '../store/reducers/usersReducer';
import { setDate } from '../utils/dateTime';

const useSubscribe = (user, subscriptionUser, isUnsubscribeAction) => {
  const dispatch = useDispatch();

  return () => {
    dispatch(
      edit({
        id: user.id,
        subscriptions: isUnsubscribeAction
          ? user.subscriptions.filter(
              (subscription) => subscription.userId !== subscriptionUser.id
            )
          : [
              ...user.subscriptions,
              { userId: subscriptionUser.id, actionDate: setDate(Date.now()) },
            ],
      })
    );
  };
};

export default useSubscribe;
