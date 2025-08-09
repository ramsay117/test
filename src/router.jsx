import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';
import InfiniteScroll from './pages/InfinteScroll';
import Debounce from './pages/Debounce';
import Pagination from './pages/Pagination';
import SortFilter from './pages/SortFilter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/todo',
    element: <Todo />,
  },
  {
    path: 'infinite-scroll',
    element: <InfiniteScroll />,
  },
  {
    path: 'debounce',
    element: <Debounce />,
  },
  {
    path: 'pagination',
    element: <Pagination />,
  },
  {
    path: 'sort-filter',
    element: <SortFilter />,
  },
]);

export default router;
