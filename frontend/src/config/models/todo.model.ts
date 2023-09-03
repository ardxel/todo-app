export interface ITodo {
  value: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodo extends Pick<ITodo, 'value'> {}
export interface UpdateTodo extends Pick<ITodo, 'value' | '_id'> {}
