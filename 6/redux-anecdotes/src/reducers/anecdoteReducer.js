import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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
      return state.concat(asObject(action.payload));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { increaseVotesOf, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
