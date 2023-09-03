import { createSelector } from '@reduxjs/toolkit';

// select user state
export const selectUserState = createSelector(
  (state: RootState) => state.user,
  (user) => user,
);

export const selectIsAuthorized = createSelector(
  (state: RootState) => state.user,
  (user) => user.isAuthorized,
);

// select user state todos
export const selectTodos = createSelector(
  (state: RootState) => state.user,
  ({ user }) => user.todos,
);

// select single todo by id from user state
export const selectTodoById = createSelector(
  [(state: RootState) => state.user.user.todos, (state, id) => id],
  (todos, id) => todos.find((todo) => todo._id === id),
);
