/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';

import { increaseVotesOf } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteItem = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = () => {
    dispatch(increaseVotesOf(anecdote));
    dispatch(setNotification(`You voted "${anecdote.content}"`))
  };
  return (
    <li key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote()}>vote</button>
      </div>
    </li>
  );
};

export default AnecdoteItem;
