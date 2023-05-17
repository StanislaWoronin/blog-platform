import { CreateUserDto } from '../../../src/api/controllers/sa/users/dto';
import request from 'supertest';
import { SaEndpoints } from '../../../libs/shared/endpoints';
import { CredentialType, ResponseType } from '../../types';
import { SortByUserField } from '../../../src/api/controllers/sa/users/dto/query/sort-by-user.field';
import { BanStatus, SortDirection } from '../../../libs/shared/enum';
import { paginationConstant } from '../../../libs/shared/pagination/query-parameters/pagination.constant';
import { TestsPaginationType } from '../../types/pagination.type';
import { ViewPage } from '../../../libs/shared/pagination/view-page';
import { ViewUser } from '../../../src/api/controllers/sa/users/response';
import { getUrlWithQuery } from "../../helpers";

export class UserRequest {
  constructor(private readonly server: any) {}

  async createUser(
    body: CreateUserDto,
    credential?: CredentialType,
  ): Promise<ResponseType<UserRequest>> {
    const response = await request(this.server)
      .post(SaEndpoints.create(true))
      .auth(credential.login, credential.password, {
        type: 'basic',
      })
      .send(body);

    return { body: response.body, status: response.status };
  }

  async getUsers(
    {
      searchLoginTerm = '',
      searchEmailTerm = '',
      sortBy = SortByUserField.CreatedAt,
      sortDirection = SortDirection.Descending,
      banStatus = BanStatus.All,
      pageNumber = paginationConstant.pageNumber,
      pageSize = paginationConstant.pageSize,
    }: TestsPaginationType<SortByUserField>,
    credential?: CredentialType,
  ): Promise<ResponseType<ViewPage<ViewUser>>> {
    const query = {
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      banStatus,
      pageNumber,
      pageSize,
    };

    const url = getUrlWithQuery(SaEndpoints.getUsers(true), query);
    const response = await request(this.server)
      .get(url)
      .auth(credential.login, credential.password, {
        type: 'basic',
      });

    return { body: response.body, status: response.status };
  }
}
