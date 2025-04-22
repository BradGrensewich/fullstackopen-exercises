import { useSelector } from 'react-redux';
import AnecdoteItem from './AnecdoteItem';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return [...state].sort((a, b) => {
      return b.votes - a.votes;
    });
  });

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <AnecdoteItem anecdote={anecdote} key={anecdote.id} />
      ))}
    </ul>
  );
};

export default AnecdoteList;
