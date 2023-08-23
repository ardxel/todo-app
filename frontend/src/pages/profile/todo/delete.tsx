import { TextField } from 'common/ui';
import { selectTodoById } from 'config/reducers/user';
import { useAppSelector } from 'hooks';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

const DeleteUserTODO = () => {
  const { id } = useParams();
  const todo = useAppSelector((state) => selectTodoById(state, Number(id)));
  const [input, setInput] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const onSubmit = () => {
    if (todo?.value !== input) {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 2000);
    } else {
      // TODO
      console.log('deleted!');
    }
  };
  return (
    <div className='reset-text-margin text-center'>
      <h1 className=' text-slate-300'>{invalid ? 'value doesnt match' : `Deleting: ${todo?.value}`}</h1>
      <p className='text-slate-300'>
        write name of todo: <b>{todo?.value}</b> to delete
      </p>
      <TextField
        className='mx-auto w-[300px]'
        onChange={handleChange}
      />
      <button
        onClick={onSubmit}
        className='mt-3 rounded-xl p-2'>
        Delete
      </button>
    </div>
  );
};

export default DeleteUserTODO;
