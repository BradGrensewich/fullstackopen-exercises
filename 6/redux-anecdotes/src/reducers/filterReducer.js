import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilterTo(state, action) {
      return action.payload;
    },
  },
});
export const { changeFilterTo } = filterSlice.actions;
export default filterSlice.reducer;
