import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import FilterInput from './components/FilterInput';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterInput />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
