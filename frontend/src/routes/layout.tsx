import { Header } from 'components';
import { UserContextProvider } from 'context';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <UserContextProvider>
        <Header />
        <div className='mt-16 h-full w-full'>
          <Outlet />
        </div>
      </UserContextProvider>
    </>
  );
};

export default Layout;
