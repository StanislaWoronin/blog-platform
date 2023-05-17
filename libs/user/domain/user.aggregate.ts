import { IUser } from './user.interface';
import { randomUUID } from 'crypto';

export class UserAggregate implements IUser {
  id = randomUUID();
  email: string;
  login: string;
  password: string;
  createdAt = new Date().toISOString();

  static create(user: Partial<IUser>) {
    const _user = new UserAggregate();
    Object.assign(_user, user);

    return _user;
  }
}
