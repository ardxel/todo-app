import { createReducer } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { createTodo, deleteTodo, signIn, signOut, signUp, updateTodo } from './user.actions';

interface UserState {
  isAuthorized: boolean;
  isLoading: boolean;
  user: import('../../models/user.model').IUser;
}

const initialState: UserState = {
  isAuthorized: true,
  isLoading: false,
  user: {
    email: 'ardxel@gmail.com',
    username: 'ardxel',
    todos: [],
  },
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(signOut, (state) => {
    localStorage.removeItem('token');
    redirect('/');
    state.isAuthorized = false;
  });

  builder.addCase(signUp, (state, action) => {
    state.isAuthorized = true;
    state.user = action.payload.user;
  });
  builder.addCase(signIn, (state, action) => {
    state.isAuthorized = true;
    state.user = action.payload.user;
  });

  builder.addCase(createTodo, (state, action) => {
    state.user.todos = action.payload.todos;
  });
  builder.addCase(updateTodo, (state, action) => {
    state.user.todos = action.payload.todos;
  });
  builder.addCase(deleteTodo, (state, action) => {
    state.user.todos = action.payload.todos;
  });
});

export default userReducer;
