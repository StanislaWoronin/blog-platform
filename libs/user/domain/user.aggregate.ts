import { UserService } from './service';
import { IUser } from './user.interface';
import { randomUUID } from 'crypto';

export class UserAggregate extends UserService implements IUser {
  id = randomUUID();
  email: string;
  login: string;
  password: string;
  createdAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(user: Partial<IUser>) {
    const _user = new UserAggregate();
    Object.assign(_user, user);

    return _user;
  }
}
