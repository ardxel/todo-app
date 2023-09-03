import { IsString } from 'class-validator';

export class CreateTodoTdo {
  @IsString()
  value: string;
}
