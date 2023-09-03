import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/user/schema';
import { UserService } from 'src/user/services';

interface JwtUserPayload {
  email: string;
  _id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Record<string, any> & JwtUserPayload): Promise<UserDocument | undefined> {
    const user = await this.userService.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
