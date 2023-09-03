import { Body, Controller, Delete, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateTodoTdo } from './dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateTodoTdo } from './dto/update-todo.dto';
import { UserDocument } from './schema';
import { TodoService, UserService } from './services';

@ApiTags('User')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService,
  ) {}

  @Post('todo')
  @HttpCode(201)
  async createTodo(@Req() req: Request, @Body() createTodoTdo: CreateTodoTdo) {
    return await this.todoService.insertTodo(req.user as UserDocument, createTodoTdo);
  }

  @Put('todo')
  @HttpCode(200)
  async updateTodo(@Req() req: Request, @Body() updateTodoTdo: UpdateTodoTdo) {
    return await this.todoService.updateTodo(req.user as UserDocument, updateTodoTdo);
  }

  @Delete('todo')
  async deleteTodo(@Param('id') id: string, @Req() req: Request, @Body() deleteTodoTdo: DeleteTodoDto) {
    return await this.todoService.deleteTodo(req.user as UserDocument, deleteTodoTdo);
  }
}
