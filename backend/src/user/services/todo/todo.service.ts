import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/user/schema';
import { UserService } from '../user';
import { CreateTodoTdo, DeleteTodoDto, UpdateTodoTdo } from './../../dto';

@Injectable()
export class TodoService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async insertTodo(user: UserDocument, createTodoTdo: CreateTodoTdo) {
    if (await this.notCompletedTodosHasValue(user, createTodoTdo.value)) {
      throw new BadRequestException(`value: \"${createTodoTdo.value}\" already exist in not complete todos`);
    }

    return await this.userModel.findOneAndUpdate(
      { email: user.email },
      { $push: { 'todos.notCompleted': { value: createTodoTdo.value } } },
      { returnDocument: 'after' },
    );
  }

  async updateTodo(user: UserDocument, updateTodoTdo: UpdateTodoTdo) {
    if (!(await this.notCompletedTodosHasId(user, updateTodoTdo._id))) {
      throw new BadRequestException(`id: \"${updateTodoTdo._id}\" does not exist in \"not complete\" todos`);
    }

    return await this.userModel.findOneAndUpdate(
      { email: user.email, 'todos.notCompleted._id': new Types.ObjectId(updateTodoTdo._id) },
      { $set: { 'todos.notCompleted.$.value': updateTodoTdo.value } },
      { returnDocument: 'after' },
    );
  }

  async deleteTodo(user: UserDocument, deleteTodoDto: DeleteTodoDto) {
    const deleted = user.todos.notCompleted.find((todo) => String(todo._id) === String(deleteTodoDto._id));
    if (!deleted) {
      throw new BadRequestException(`id: \"${deleteTodoDto._id}\" does not exist in \"not complete\" todos`);
    }
    const notCompletedPath = 'todos.notCompleted';
    const trashPath = 'todos.trash';
    await this.userModel.bulkWrite([
      {
        /* delete todo from notCompleted */
        updateOne: {
          filter: { email: user.email },
          // @ts-ignore
          update: { $pull: { [notCompletedPath]: { _id: new Types.ObjectId(deleteTodoDto._id) } } },
        },
      },
      {
        /* push deleted todo in trash array */
        updateOne: {
          filter: { email: user.email },
          // @ts-ignore
          update: { $push: { [trashPath]: deleted } },
        },
      },
    ]);

    return await this.userModel.findOne({ email: user.email });
  }

  private async notCompletedTodosHasValue(user: UserDocument, value: string) {
    return Boolean(await this.userModel.findOne({ 'todos.notCompleted': { $elemMatch: { value } } }));
  }
  private async notCompletedTodosHasId(user: UserDocument, _id: string) {
    return Boolean(
      await this.userModel.findOne({
        email: user.email,
        'todos.notCompleted': { $elemMatch: { _id } },
      }),
    );
  }
}
