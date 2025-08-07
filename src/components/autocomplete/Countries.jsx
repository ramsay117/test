import { useEffect, useState } from 'react';
import { countriesClient } from '../../api/axiosClient';

function Countries() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await countriesClient.get();
        setCountries(response.data?.data || []);
        setAllCountries(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setCountries(allCountries);
      return;
    }
    const timeout = setTimeout(() => {
      const filtered = allCountries.filter((country) =>
        country?.country.toLowerCase().startsWith(search.toLowerCase()),
      );
      setCountries(filtered);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, allCountries]);
  return (
    <div>
      <input
        type='text'
        placeholder='Search for a country'
        onChange={(e) => setSearch(e.target.value)}
      />
      <ol>
        {countries.length > 0 &&
          countries
            .slice(0, 10)
            .map((country) => <li key={country.country}>{country.country}</li>)}
      </ol>
    </div>
  );
}

export default Countries;
