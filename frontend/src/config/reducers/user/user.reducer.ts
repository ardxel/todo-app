import { createReducer } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { createTodo, deleteTodo, signIn, signOut, updateTodo } from './user.actions';

interface UserState {
  isAuthorized: boolean;
  isLoading: boolean;
  user: import('../../models/user.model').IUser;
}

const mockTodos = [
  {
    value: 'make coffee',
    _id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: 'go to work',
    _id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: 'go to sleep',
    _id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialState: UserState = {
  isAuthorized: true,
  isLoading: false,
  user: {
    email: 'ardxel@gmail.com',
    username: 'ardxel',
    todos: mockTodos,
  },
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(signOut, (state) => {
    localStorage.removeItem('token');
    redirect('/');
    state.isAuthorized = false;
  });

  builder.addCase(signIn, (state, action) => {
    state.isAuthorized = true;
    state.user = action.payload.user;
  });

  builder.addCase(createTodo, (state, action) => {
    console.log(action);
    state.user.todos.push(action.payload.todo);
  });
  builder.addCase(updateTodo, (state, action) => {
    const index = state.user.todos.findIndex((todo) => todo._id === action.payload.todo._id);

    if (index) {
      state.user.todos[index] = action.payload.todo;
    }
  });
  builder.addCase(deleteTodo, (state, action) => {
    state.user.todos = state.user.todos.filter((todo) => todo._id !== action.payload.todo._id);
  });
});

export default userReducer;
