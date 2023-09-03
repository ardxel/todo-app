import { IsString } from 'class-validator';

export class UpdateTodoTdo {
  @IsString()
  value: string;

  @IsString()
  _id: string;
}
