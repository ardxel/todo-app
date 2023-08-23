import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import profileRouter from './profile.route';

/**
 * wrap pages to lazy
 */
const Authorization = lazy(() => import('pages/auth'));

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
      // profile router
      profileRouter,
    ],
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);

export default router;
