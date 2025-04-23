import { useSelector } from 'react-redux';
import AnecdoteItem from './AnecdoteItem';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return [...anecdotes].sort((a, b) => {
        return b.votes - a.votes;
      });
    }
    const filteredAnecdotes = [...anecdotes].filter((a) =>
      a.content.includes(filter),
    );
    return [...filteredAnecdotes].sort((a, b) => {
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
