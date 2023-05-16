import { IUser } from "../../../domain";

export type CreateUserDto = Pick<IUser, 'login' | 'password' | 'email'>;