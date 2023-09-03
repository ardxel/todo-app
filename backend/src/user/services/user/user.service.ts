import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto';
import { User, UserDocument } from '../../schema/user.schema';
import { HashService } from '../hash/hash.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly model: Model<UserDocument>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    /* returns safe copy without password */
    const user = await this.model.create({
      email,
      username,
      password: await this.hashService.encryptPassword(password),
    });

    return this.safeCopy(user);
  }

  async findOne<T extends Partial<User & { _id: Types.ObjectId }>>(user: T) {
    /* find by email */
    if (user.username) {
      const matchedByUsername = await this.model.findOne({ username: user.username });
      if (matchedByUsername) {
        return matchedByUsername;
      }
    }
    /* find by username */
    if (user.email) {
      const matchedByEmail = await this.model.findOne({ email: user.email });
      if (matchedByEmail) {
        return matchedByEmail;
      }
    }
  }

  async updateUser<T extends UserDocument>(user: UserDocument) {
    try {
      return await user.save();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  safeCopy<T extends UserDocument>(user: T): Omit<User & { _id: Types.ObjectId }, 'password'> {
    const { password, ...safe } = user.toObject();
    return safe;
  }
}
