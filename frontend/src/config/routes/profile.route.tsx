import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

/**
 * wrap pages to lazy
 */

const Profile = lazy(() => import('pages/profile'));

const CreateUserTODO = lazy(() => import('pages/profile/todo/create'));
const EditUserTODO = lazy(() => import('pages/profile/todo/edit'));
const DeleleUserTODO = lazy(() => import('pages/profile/todo/delete'));

const profileRouter: RouteObject = {
  path: '/user',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Profile />,
    },
    {
      path: 'todo/create',
      element: <CreateUserTODO />,
    },
    {
      path: 'todo/:id/edit',
      element: <EditUserTODO />,
    },
    {
      path: 'todo/:id/delete',
      element: <DeleleUserTODO />,
    },
  ],
};

export default profileRouter;
