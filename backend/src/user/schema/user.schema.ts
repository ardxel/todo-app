import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Todo, TodoSchema } from './todo.schema';

export type UserDocument = HydratedDocument<User>;

@NestSchema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({
    _id: false,
    type: {
      _id: false,
      notCompleted: { type: [TodoSchema], default: [] },
      completed: { type: [TodoSchema], default: [] },
      trash: { type: [TodoSchema], default: [] },
    },
  })
  todos: {
    completed: Todo[];
    notCompleted: Todo[];
    trash: Todo[];
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
