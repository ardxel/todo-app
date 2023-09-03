import { Test, TestingModule } from '@nestjs/testing';
import { HashService, TodoService, UserService } from './services';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { useValue: {}, provide: UserService },
        { useValue: {}, provide: TodoService },
        { useValue: {}, provide: HashService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
