export interface IUser {
  email: string;
  username: string;
  todos: import('./todo.model').ITodo[];
  createdAt?: string;
  updatedAt?: string;
}
