import { countriesClient } from '@/api/axiosClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Pagination() {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await countriesClient.get('/');
        setCountries(response.data?.data || []);
      } catch (error) {
        toast.error(error.message || 'Error fetching countries');
      }
    };

    getCountries();
  }, []);

  return (
    <>
      <Card className='w-screen max-w-md'>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <ol>
            {countries.slice(page * 10, (page + 1) * 10).map((country) => (
              <li key={country.country}>{country.country}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <Button variant='outline' onClick={() => setPage(Math.max(0, page - 1))}>
        Prev
      </Button>
      <Button
        variant='outline'
        onClick={() =>
          setPage(Math.min(Math.ceil(countries.length / 10) - 1, page + 1))
        }
      >
        Next
      </Button>
    </>
  );
}

export default Pagination;
