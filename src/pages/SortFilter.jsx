import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function SortFilter() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Country</TableHead>
          <TableHead>Capital</TableHead>
          <TableHead>Population</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}

export default SortFilter;
