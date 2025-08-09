import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' />
    </>
  );
}

export default App;
