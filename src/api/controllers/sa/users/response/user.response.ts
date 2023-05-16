import { IUser } from "../../../../../../libs/user";

export class UserResponse implements Omit<IUser, 'password'> {
  id: string;
  login: string;
  email: string;
  createdAt: string;
  banInfo: {
    isBanned: string,
    banDate: string,
    banReason: string
  }

  static
}