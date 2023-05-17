import {
  IBanInfoInterface,
  ViewUser,
} from '../../src/api/controllers/sa/users/response';
import { CreateUserDto } from '../../src/api/controllers/sa/users/dto';

export const viewUser = (
  dto: CreateUserDto,
  banInfo?: IBanInfoInterface,
): ViewUser => {
  if (!banInfo) {
    banInfo = {
      isBanned: false,
      banDate: null,
      banReason: null,
    };
  }

  return {
    id: expect.any(String),
    login: dto.login,
    email: dto.email,
    createdAt: expect.any(String),
    banInfo: banInfo,
  };
};
