import { UserQueryDto } from '../../../../../src/api/controllers/sa/users/dto/query';
import { QueryDto } from "../../../../shared/pagination/query-parameters";

export class GetUsersQuery {
  constructor(public readonly queryDto: UserQueryDto & QueryDto) {}
}
