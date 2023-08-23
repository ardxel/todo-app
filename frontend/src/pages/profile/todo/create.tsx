import { createSelector } from '@reduxjs/toolkit';
import { TextField } from 'common/ui';
import { ITodo } from 'config/models';
import { createTodo } from 'config/reducers/user';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ChangeEvent, useState } from 'react';

const selectUserTodoLength = createSelector(
  (state: RootState) => state.user.user,
  (user) => user.todos.length,
);

const CreateUserTODO = () => {
  const todosLength = useAppSelector(selectUserTodoLength);
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

    const todo: ITodo = {
      value: value,
      _id: todosLength,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch(createTodo(todo));
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
