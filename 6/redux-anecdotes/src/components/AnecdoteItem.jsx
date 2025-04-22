/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { increaseVotesOf } from '../reducers/anecdoteReducer';

const AnecdoteItem = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(increaseVotesOf(id));
  };
  return (
    <li key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </li>
  );
};

export default AnecdoteItem;
