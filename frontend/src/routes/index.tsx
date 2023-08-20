import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

/**
 * wrap pages to lazy
 */
const Authorization = lazy(() => import('pages/auth'));
const Profile = lazy(() => import('pages/profile'));

/**
 * app routing
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      //authorization page
      {
        path: '/auth',
        element: <Authorization />,
      },

      //profile page
      {
        path: '/user',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);

export default router;
