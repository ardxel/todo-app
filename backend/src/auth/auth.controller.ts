import { BadRequestException, Body, Controller, HttpCode, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors';
import { User } from 'src/user/schema';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('Authentication')
@UseInterceptors(TransformInterceptor<{ user: User; token: string }>)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  @HttpCode(201)
  async signUp(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors[0].constraints),
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors[0].constraints),
      }),
    )
    loginUserDto: LoginUserDto,
  ) {
    return await this.authService.signIn(loginUserDto);
  }
}
