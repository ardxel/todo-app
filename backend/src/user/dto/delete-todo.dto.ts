import { IsString } from 'class-validator';

export class DeleteTodoDto {
  @IsString()
  _id: string;
}
