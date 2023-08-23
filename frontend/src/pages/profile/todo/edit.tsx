import { TextField } from 'common/ui';
import { ITodo } from 'config/models';
import { selectTodoById, updateTodo } from 'config/reducers/user';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const EditUserTODO: FC = () => {
  const { id } = useParams();
  const todo = useAppSelector((state) => selectTodoById(state, Number(id)));
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInput(value);
  };
  const onSubmit = () => {
    const changedTodo = { ...todo, value: input, updatedAt: new Date() } as ITodo;
    dispatch(updateTodo(changedTodo));
  };
  return (
    <form>
      <h1 className='text-center text-zinc-300 first-letter:capitalize'>{todo?.value}</h1>
      <TextField
        onChange={handleChange}
        className='max-w-80 mx-auto w-80'
        name='enter new value'
      />
      <button
        onClick={onSubmit}
        type='submit'
        className={twMerge(
          'btn mx-auto mt-4 block w-36 rounded-xl',
          'bg-slate-300 p-3 font-bold leading-none text-zinc-700 transition-all ease-linear',
          'hover:scale-110 hover:bg-slate-500 hover:text-lg hover:leading-none',
        )}>
        Send
      </button>
    </form>
  );
};

export default EditUserTODO;
