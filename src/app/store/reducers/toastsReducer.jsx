import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const selectToasts = (state) => state.toasts.list;

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    remove: (state, action) => {
      state.list = state.list.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { add, remove } = toastsSlice.actions;

export default toastsSlice.reducer;
