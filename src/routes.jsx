import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './features/home/pages';
import { AboutPage } from './features/about/pages';
import Layout from './features/layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'about',
        element: <AboutPage />,
        children: [{ path: 'contact', element: <h2>Contact</h2> }]
      },
      { path: '*', element: <h1>404</h1> }
    ]
  }
]);

export default router;
