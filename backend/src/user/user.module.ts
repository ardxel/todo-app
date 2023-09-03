import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { HashService, TodoService, UserService } from './services';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, HashService, TodoService],
  exports: [UserService, HashService],
})
export class UserModule {}
