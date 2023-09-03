import { createAction } from '@reduxjs/toolkit';
import { CreateTodo, ITodo, IUser } from 'config/models';

export const signOut = createAction('user/signOut');

export const signUp = createAction('user/signUp', (user: IUser) => {
  return {
    payload: {
      user,
    },
  };
});

export const signIn = createAction('user/signIn', (user: IUser) => {
  return {
    payload: {
      user,
    },
  };
});

export const createTodo = createAction('user/createTodo', (todos: ITodo[]) => {
  return {
    payload: {
      todos,
    },
  };
});

export const deleteTodo = createAction('user/deleteTodoById', (todos: ITodo[]) => {
  return {
    payload: {
      todos,
    },
  };
});

export const updateTodo = createAction('user/updateTodo', (todos: ITodo[]) => {
  return {
    payload: {
      todos,
    },
  };
});
