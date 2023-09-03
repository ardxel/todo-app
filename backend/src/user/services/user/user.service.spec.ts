import mongoose, { Model } from 'mongoose';
import { UserDocument, UserSchema } from 'src/user/schema';
import { HashService } from '../hash';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;
  beforeEach(async () => {
    // @ts-ignore
    service = new UserService(mongoose.model('user', UserSchema), new HashService());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
