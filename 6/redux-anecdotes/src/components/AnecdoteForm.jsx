import { useDispatch } from 'react-redux';

import anecdoteService from '../services/anecdotes';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async(e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const saved = await anecdoteService.createNew(content)
    dispatch(createAnecdote(saved));
    dispatch(setNotification(`You added "${content}"`))

  };
  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm;
