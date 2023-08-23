import { TODO } from 'components';
import { selectTodos } from 'config/reducers/user';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Profile = () => {
  const todos = useAppSelector(selectTodos);

  return (
    <main className={twMerge('mx-auto mt-14 w-2/3 rounded-md bg-slate-900 p-2 text-zinc-200')}>
      <ul className='mx-auto flex w-3/4 list-none flex-col gap-y-4 pl-0'>
        <div className='flex items-center justify-between'>
          <h3>My todos: </h3>
          <Link
            to={'todo/create'}
            className='a-default flex h-10 items-center rounded-xl border-none bg-slate-300 px-2 !text-zinc-800 outline-none'>
            <p className='reset-text-margin'>create todo</p>
          </Link>
        </div>
        {todos.map((todo, index) => {
          return (
            <TODO
              key={index}
              {...todo}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Profile;
