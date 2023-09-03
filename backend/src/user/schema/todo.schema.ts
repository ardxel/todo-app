import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Todo {
  value: string;
  _id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

@Schema({ timestamps: true })
export class Todo {
  @Prop({ type: String, required: true })
  value: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
