import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVotesOf(state, action) {
      const id = action.payload;
      const toChange = state.find((a) => a.id === id);
      const changed = { ...toChange, votes: toChange.votes + 1 };
      return state.map((a) => (a.id === id ? changed : a));
    },
    createAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { increaseVotesOf, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
