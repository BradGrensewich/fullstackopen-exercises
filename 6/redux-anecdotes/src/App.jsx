import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import FilterInput from './components/FilterInput';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterInput />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
