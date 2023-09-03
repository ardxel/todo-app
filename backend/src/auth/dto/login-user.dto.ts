import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  emailOrUsername: string;

  @IsString()
  password: string;
}
