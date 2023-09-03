import { TextField } from 'common/ui';
import { CreateTodo, ITodo } from 'config/models';
import { useAppDispatch } from 'hooks';
import { ChangeEvent, useState } from 'react';
import { fetchNewTodo } from './fetchChanges';

const CreateUserTODO = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (invalid) {
      setInvalid(false);
    }
    setValue(event.target.value);
  };

  const onSubmit = () => {
    if (value.length === 0) {
      return setInvalid(true);
    }

    const todo: CreateTodo = {
      value: value,
    };

    dispatch(fetchNewTodo(todo));
  };

  return (
    <div className='text-center text-slate-300'>
      <h1>{invalid ? 'Value must be not empty' : 'Write title for new todo'}</h1>
      <TextField
        onChange={onChange}
        placeholder='create todo...'
      />
      <button onClick={onSubmit}>Create</button>
    </div>
  );
};

export default CreateUserTODO;
