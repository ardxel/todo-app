import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema';
import { HashService, UserService } from 'src/user/services';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    if (await this.isUserExist({ email: createUserDto.email })) {
      throw new BadRequestException('this email is already taken');
    }
    if (await this.isUserExist({ username: createUserDto.username })) {
      throw new BadRequestException('this username is already taken');
    }
    const user = await this.userService.create(createUserDto);

    const access_token = await this.jwtService.signAsync({ email: user.email, _id: user._id });
    return {
      user,
      access_token,
    };
  }

  async signIn(loginUserDto: LoginUserDto) {
    const user =
      (await this.userService.findOne({ email: loginUserDto.emailOrUsername })) ||
      (await this.userService.findOne({ username: loginUserDto.emailOrUsername }));

    if (!user) {
      throw new BadRequestException('user with this email or username is not exist');
    }

    if (!(await this.hashService.comparePassword(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }
    const safeUser = this.userService.safeCopy(user);
    const access_token = await this.jwtService.signAsync({ username: safeUser.username, _id: safeUser._id });
    return {
      user: safeUser,
      access_token,
    };
  }

  private async isUserExist<T extends Partial<User>>(userDto: T): Promise<boolean> {
    return Boolean(await this.userService.findOne(userDto));
  }
}
