import { IBanInfoInterface, IUser } from '../../../../../../libs/user';

export class UserResponse implements Omit<IUser, 'password'> {
  id: string;
  login: string;
  email: string;
  createdAt: string;
  banInfo: {
    isBanned: boolean;
    banDate: string;
    banReason: string;
  };

  static viewUser(
    user: Partial<IUser>,
    banInfo?: IBanInfoInterface,
  ): UserResponse {
    if (!banInfo) {
      banInfo = {
        isBanned: false,
        banDate: null,
        banReason: null,
      };
    }
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
      banInfo: banInfo,
    };
  }
}
