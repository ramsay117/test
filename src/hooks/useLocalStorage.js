import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error getting item from localStorage', error);
      return initialValue;
    }
  });

  function setValue(val) {
    try {
      const valueToStore = typeof val === 'function' ? val(storedValue) : val;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting item in localStorage', error);
    }
  }

  return [storedValue, setValue];
};
