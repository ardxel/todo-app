import { Header } from 'components';
import store from 'config/state';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div className='mt-16 h-full w-full'>
          <Suspense fallback={<h1 className='text-red text-3xl'>Loading...</h1>}>
            <Outlet />
          </Suspense>
        </div>
      </Provider>
    </>
  );
};

export default Layout;
