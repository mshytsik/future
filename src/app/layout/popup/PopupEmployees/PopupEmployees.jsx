import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, edit } from '../../../store/reducers/usersReducer';

import Popup from '../Popup/Popup';
import UsersSearch from '../../../components/UsersSearch/UsersSearch';
import { User, Button } from '../../../components/shared';

import removeIcon from '../../../assets/img/icons/close-red.svg';

import './PopupEmployees.scss';

const PopupEmployees = ({ isActive, user }) => {
  const users = useSelector(selectUsers);

  const [employeesIds, setEmployeesIds] = useState(
    user.registeredEmployees ?? []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(edit({ id: user.id, registeredEmployees: employeesIds }));
  }, [employeesIds]);

  return (
    <Popup
      isActive={isActive}
      head={{ title: 'Edit participants' }}
      className="popup-employees"
    >
      <UsersSearch
        foundUsersIds={employeesIds}
        setUserCallback={(userId) =>
          setEmployeesIds((prev) => [userId, ...prev])
        }
      />

      <div className="popup-employees__list employees">
        {employeesIds.map((userId) => {
          const currentUser = users.find((user) => user.id === userId);

          return (
            <div key={currentUser.id} className="employees__user">
              <User
                user={currentUser}
                subtitle={currentUser.details.area}
                callback={() =>
                  window.open(`/author/${currentUser.nickname}`, '_blank')
                }
                className="user--link"
                verifyNearTitle
              />

              <Button
                callback={() =>
                  setEmployeesIds((prev) =>
                    prev.filter((userId) => userId !== currentUser.id)
                  )
                }
                title="Remove"
                icon={{ iconSrc: removeIcon }}
                type="secondary"
                size="md"
              />
            </div>
          );
        })}
      </div>
    </Popup>
  );
};

export default PopupEmployees;
