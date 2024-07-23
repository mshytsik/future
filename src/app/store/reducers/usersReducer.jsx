import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getStorageUsers } from '../../utils/localStorage';

import users from '../../mocks/users';

const initialState = getStorageUsers() ?? {
  list: users,
  current: 1,
};

const selectSelf = (state) => state;

export const selectUsersState = createSelector(
  selectSelf,
  (state) => state.users
);

export const selectUsers = createSelector(
  selectSelf,
  (state) => state.users.list
);

export const selectUser = (id) =>
  createSelector(selectSelf, (state) =>
    state.users.list.find((user) => user.id === id)
  );

export const selectUserByNickname = (nickname) =>
  createSelector(selectSelf, (state) =>
    state.users.list.find((user) => user.nickname === nickname)
  );

export const selectCurrentUser = createSelector(selectSelf, (state) =>
  state.users.list.find((user) => user.id === state.users.current)
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.current = action.payload;
    },
    register: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    edit: (state, action) => {
      state.list = state.list.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    },
    logout: (state) => {
      state.current = undefined;
    },
  },
});

export const { login, register, edit, logout } = usersSlice.actions;

export default usersSlice.reducer;
