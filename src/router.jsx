import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';
import InfiniteScroll from './pages/InfinteScroll';
import Debounce from './pages/Debounce';

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
]);

export default router;
