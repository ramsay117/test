import { countriesClient } from '@/api/axiosClient';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

function SortFilter() {
  const [countries, setCountries] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [filter, setFilter] = useState('');

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

  function handleSort(column) {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  }

  const sortedCountries = useMemo(() => {
    return [
      ...countries.filter(
        (c) =>
          (c.name ?? '').toLowerCase().includes(filter.toLowerCase()) ||
          (c.capital ?? '').toLowerCase().includes(filter.toLowerCase()),
      ),
    ].sort((a, b) => {
      if (sortDir === 'asc') {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      return b[sortBy].localeCompare(a[sortBy]);
    });
  }, [countries, filter, sortDir, sortBy]);

  return (
    <>
      <Input type='search' onChange={(e) => setFilter(e.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className='cursor-pointer'
              onClick={() => handleSort('name')}
            >
              <div className='flex gap-2'>
                Country <ArrowUpDown className='w-4 h-4' />
              </div>
            </TableHead>
            <TableHead
              className='cursor-pointer'
              onClick={() => handleSort('capital')}
            >
              <div className='flex gap-2 '>
                Capital <ArrowUpDown className='w-4 h-4' />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCountries.map((country) => (
            <TableRow key={country.name}>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.capital}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default SortFilter;
