import { UserQueryDto } from '../../../../../src/api/controllers/sa/users/dto/query';

export class GetUsersQuery {
  constructor(public readonly queryDto: UserQueryDto) {}
}
