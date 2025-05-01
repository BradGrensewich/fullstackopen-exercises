import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    },
  },
});

export const { setMessage, removeNotification } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
