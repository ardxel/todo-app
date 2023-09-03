import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  }

  async comparePassword(data: string, encrypted: string): Promise<boolean> {
    try {
      return await compare(data, encrypted);
    } catch (error) {
      throw new UnauthorizedException('Incorrect password');
    }
  }
}
