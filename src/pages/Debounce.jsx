import { useEffect, useState } from 'react';

function Debounce() {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      if (pass.length > 0 && pass.trim().length <= 3) {
        setErr('password length must be greater than 3');
      } else setErr('');
    }, 1000);
    return () => clearTimeout(id);
  }, [pass]);

  return (
    <div>
      <input type='password' onChange={(e) => setPass(e.target.value)} />
      {err.length > 0 && <p>{err}</p>}
    </div>
  );
}

export default Debounce;
