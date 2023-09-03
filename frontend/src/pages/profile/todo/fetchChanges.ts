import { http, Response } from 'config/api';
import { CreateTodo, IUser, UpdateTodo } from 'config/models';
import { createTodo, updateTodo } from 'config/reducers/user';

export const fetchNewTodo = (todo: CreateTodo) => {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    try {
      const response = await http.post<Response<{ user: IUser }>>('/user/todo', todo);
      const todos = response.data.payload.user.todos;
      dispatch(createTodo(todos));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUpdateTodo = (todo: UpdateTodo) => {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    try {
      const response = await http.post<Response<{ user: IUser }>>('/user/todo', todo);
      const todos = response.data.payload.user.todos;
      dispatch(updateTodo(todos));
    } catch (error) {
      console.log(error);
    }
  };
};
