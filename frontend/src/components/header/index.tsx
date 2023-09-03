import { Menu } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AccountCircleOutlined,
  ExitToApp,
  Menu as MenuClosedIcon,
  MenuOpen as MenuOpenIcon,
  PersonAddOutlined,
} from '@material-ui/icons';
import { selectIsAuthorized, selectUserState } from 'config/reducers/user';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const close = () => setOpenMenu(false);

  return (
    <header className='absolute z-[999] flex h-16 w-full justify-center bg-slate-900'>
      <div className='flex w-full max-w-[1440px] items-center justify-between pl-2 pr-4'>
        <div
          className='w-30 flex cursor-pointer flex-col items-center 
        justify-center rounded-lg bg-slate-800 p-2
        text-zinc-300 backdrop-blur-3xl hover:text-zinc-400'
          onClick={() => navigate('/')}>
          <span className='text-2xl leading-5'>TODO</span>
          <span className='text-xs leading-4'>application</span>
        </div>

        <div className='bg-blue-gray-600 flex h-16 items-center gap-x-2'>
          <Menu
            as='div'
            className='relative inline-block'>
            <Menu.Button
              as='button'
              onClick={() => setOpenMenu(!openMenu)}
              className='btn relative'>
              {openMenu ? (
                <MenuOpenIcon className='!h-7 !w-7 text-zinc-300' />
              ) : (
                <MenuClosedIcon className='!h-7 !w-7 text-zinc-300' />
              )}{' '}
            </Menu.Button>
            <Menu.Items className='absolute right-0 flex w-40 flex-col gap-y-2 rounded-md bg-zinc-300 px-3 py-3 text-left text-sm'>
              <>
                {/* profile button */}
                {isAuthorized && (
                  <Menu.Item>
                    {() => (
                      <Link
                        onClick={close}
                        to='/user'
                        className='a-default group flex w-full items-center gap-x-2'>
                        <AccountCircleOutlined className='!h-6 !w-6 !p-0 text-slate-800 group-hover:!text-zinc-400' />
                        <span className='capitalize text-slate-800 group-hover:!text-zinc-400'>profile</span>
                      </Link>
                    )}
                  </Menu.Item>
                )}
                {/* sign up button */}
                {!isAuthorized && (
                  <Menu.Item>
                    {() => (
                      <Link
                        onClick={close}
                        to='/auth'
                        className='a-default group flex w-full items-center gap-x-2'>
                        <PersonAddOutlined className='!h-6 !w-6 !p-0 text-slate-800 group-hover:!text-zinc-400' />
                        <span className='capitalize text-slate-800 group-hover:!text-zinc-400'>sign up</span>
                      </Link>
                    )}
                  </Menu.Item>
                )}
                {/* sign out button */}
                {isAuthorized && (
                  <Menu.Item>
                    {() => (
                      <Link
                        onClick={() => {
                          close();
                          dispatch({ type: 'user/signOut' });
                        }}
                        to='/'
                        className='a-default group flex w-full items-center gap-x-2'>
                        <ExitToApp className='!h-6 !w-6 !p-0 text-slate-800 group-hover:!text-zinc-400' />
                        <span className='capitalize text-slate-800 group-hover:!text-zinc-400'>sign out</span>
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
}
