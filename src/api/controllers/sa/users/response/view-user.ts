import { IBanInfoInterface, IUser } from '../../../../../../libs/user';

export class ViewUser implements Omit<IUser, 'password'> {
  id: string;
  login: string;
  email: string;
  createdAt: string;
  banInfo: {
    isBanned: boolean;
    banDate: string;
    banReason: string;
  };

  static viewUser(user: Partial<IUser>, banInfo?: IBanInfoInterface): ViewUser {
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
