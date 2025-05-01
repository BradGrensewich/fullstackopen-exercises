import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

import { setNotification } from './notificationReducer';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updated = action.payload;
      return state.map((a) => (a.id === updated.id ? updated : a));
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(setNotification(`You added "${content}"`, 5));
  };
};

export const increaseVotesOf = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.increaseVotesOf(anecdote);
    dispatch(updateAnecdote(updated));
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 2));
  };
};
export default anecdoteSlice.reducer;
