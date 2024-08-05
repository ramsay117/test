import './App.css';
import { useLocalStorage } from './hooks';

function App() {
  const [storedValue, setValue] = useLocalStorage('a', 10);
  return (
    <>
      <button onClick={() => setValue((prev) => prev + 1)}>Increment</button>
      <p>{storedValue}</p>
    </>
  );
}

export default App;
