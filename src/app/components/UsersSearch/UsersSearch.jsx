import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/reducers/usersReducer';
import { useForm } from 'react-hook-form';
import { errorHandler } from '../../utils/utils';

import { Form, FormInput } from '../form';
import { Dropdown, User } from '../shared';

import './UsersSearch.scss';

const UsersSearch = ({ foundUsersIds, setUserCallback = null }) => {
  const defaultValues = { userName: '' };

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: false, defaultValues });

  const onSubmit = (data) => {
    const searchName = data.userName.toLowerCase();
    const found = users.filter(
      (user) =>
        !foundUsersIds.find((foundUserId) => foundUserId === user.id) &&
        (user.nickname.toLowerCase().includes(searchName) ||
          user.username.toLowerCase().includes(searchName))
    );

    if (found.length) {
      setNewFoundUsers(found);
      setShowDropdown(true);
    }
  };

  const watchUserName = watch('userName');

  const [showDropdown, setShowDropdown] = useState(false);

  const users = useSelector(selectUsers);
  const [newFoundUsers, setNewFoundUsers] = useState([]);

  const handleFoundUserClick = (userId) => {
    reset(defaultValues);
    setShowDropdown(false);
    setUserCallback?.(userId);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
      className="users-search"
    >
      <div className="users-search__input">
        <FormInput
          control={control}
          value={watchUserName}
          setValue={setValue}
          name="userName"
          labelBlock={false}
          type="text"
          placeholder="Start typing your first name, last name or company name..."
          required
          minLength={3}
          error={errors.userName}
          isSearch
          handleSubmit={handleSubmit(onSubmit, (errors) =>
            errorHandler(errors)
          )}
          submitOnEnter
          onChangeCallback={() => showDropdown && setShowDropdown(false)}
        />
      </div>

      {showDropdown && (
        <Dropdown
          items={newFoundUsers.map((user) => ({
            name: user.id,
            callback: () => handleFoundUserClick(user.id),
            content: (
              <User user={user} subtitle={user.details.area} verifyNearTitle />
            ),
          }))}
          isActive={showDropdown}
          setIsActive={setShowDropdown}
          className="users-search__popup"
        />
      )}
    </Form>
  );
};

export default UsersSearch;
