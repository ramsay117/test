import { useState, useEffect } from 'react';
import { countriesClient } from '../api/axiosClient';

function InfiniteScroll() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCountries = async () => {
    setLoading(true);
    const res = await countriesClient.get('/');
    setCountries((prev) => [...prev, ...res.data?.data.map((d) => d.country)]);
    setLoading(false);
  };

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        loadCountries();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <ol>{loading ? 'Loading...' : countries.map((c) => <li>{c}</li>)}</ol>
    </div>
  );
}

export default InfiniteScroll;
