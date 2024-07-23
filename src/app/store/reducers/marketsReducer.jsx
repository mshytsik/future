import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const selectMarkets = (state) => state.markets.list;

export const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {
    fill: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { fill } = marketsSlice.actions;

export default marketsSlice.reducer;
