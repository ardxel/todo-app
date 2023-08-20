import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AccountCircle } from '@material-ui/icons';
import { useUserContext } from 'context';

export default function Header() {
  const { isAuthorized, logout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.pathname === '/auth' ? 'logging...' : isAuthorized ? 'logout' : 'sign up';

  return (
    <header className="absolute w-full h-16 px-2 flex items-center justify-between bg-slate-900 z-[999]">
      <div
        className="bg-slate-800 p-2 rounded-lg text-zinc-300 flex 
        justify-center flex-col items-center backdrop-blur-3xl
        hover:text-zinc-400 cursor-pointer w-30"
        onClick={() => navigate('/')}>
        <span className="leading-5 text-2xl">TODO</span>
        <span className="leading-4 text-xs">application</span>
      </div>

      <div className="flex gap-x-2 h-16 items-center bg-blue-gray-600">
        <Link
          onClick={logout}
          to={isAuthorized ? '/' : '/auth'}
          className="h-16 relative flex items-center justify-center gap-x-1 hover:text-zinc-400">
          <span className="capitalize text-zinc-300">{title}</span>
          <AccountCircle className="w-9 h-9 text-zinc-300 relative" />
        </Link>
      </div>
    </header>
  );
}
