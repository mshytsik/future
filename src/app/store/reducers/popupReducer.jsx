import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: {
    id: '',
    data: null,
  },
};

export const selectActivePopup = (state) => state.popup.active;

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    show: (state, action) => {
      state.active =
        typeof action.payload === 'string'
          ? { id: action.payload, data: null }
          : { id: action.payload.id, data: action.payload.data };
    },
    hide: (state) => {
      state.active = {
        id: '',
        data: null,
      };
    },
  },
});

export const { show, hide } = popupSlice.actions;

export default popupSlice.reducer;
