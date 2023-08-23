import { createAction } from '@reduxjs/toolkit';
import { ITodo, IUser } from 'config/models';

export const signOut = createAction('user/signOut');

export const signIn = createAction('user/signIn', (user: IUser) => {
  return {
    payload: {
      user,
    },
  };
});

export const createTodo = createAction('user/createTodo', (todo: ITodo) => {
  return {
    payload: {
      todo,
    },
  };
});

export const deleteTodo = createAction('user/deleteTodoById', (todo: ITodo) => {
  return {
    payload: {
      todo,
    },
  };
});

export const updateTodo = createAction('user/updateTodo', (todo: ITodo) => {
  return {
    payload: {
      todo,
    },
  };
});
