import { useContext, useEffect, useState } from 'react';
import './App.css';
import { ThemeContext } from './contexts/ThemeContext.js';

function App() {
  const [theme, toggleTheme] = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    if (name == '') {
      setErr('');
      return;
    }
    const id = setTimeout(() => {
      console.log('checking name length...', name);
      if (name.trim().length < 3) {
        setErr('Name must be at least 3 characters long');
      } else {
        setErr('');
      }
    }, 1000);
    () => clearTimeout(id);
  }, [name]);
  return (
    <>
      {theme}
      <button onClick={() => toggleTheme()}>Change</button>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <p>{name}</p>
      {err && <p>{err}</p>}
    </>
  );
}

export default App;
