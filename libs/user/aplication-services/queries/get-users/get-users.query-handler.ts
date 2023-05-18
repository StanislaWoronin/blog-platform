import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { ViewPage } from '../../../../shared/pagination/view-page';
import { ViewUser } from '../../../../../src/api/controllers/sa/users/response';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BanStatus } from '../../../../shared/enum';
import { UserQueryDto } from '../../../../../src/api/controllers/sa/users/dto/query';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, ViewPage<ViewUser>>
{
  private readonly logger = new Logger(GetUsersQueryHandler.name);
  private readonly prisma = new PrismaClient();

  async execute({ queryDto }: GetUsersQuery): Promise<ViewPage<ViewUser>> {
    const filter = this.getFilter(queryDto);
    const countFilter = this.getWhereFilter(queryDto);

    const users = await this.prisma.user
      .findMany(filter)
      .catch((err) => this.logger.error(err));
    const count = await this.prisma.user
      .count(countFilter)
      .catch((err) => this.logger.error(err));

    const items = !users ? [] : users.map((u) => ViewUser.viewUser(u));
    const totalCount = !count ? 0 : count;
    return new ViewPage({ items, query: queryDto, totalCount });
  }

  private getFilter = (dto: UserQueryDto) => {
    const { sortBy, sortDirection, pageSize, skip } = dto;
    const filter = this.getWhereFilter(dto);
    return {
      ...filter,
      orderBy: { [sortBy]: sortDirection },
      take: Number(pageSize),
      skip: Number(skip),
    };
  };

  private getWhereFilter = (dto: UserQueryDto) => {
    const { banStatus, searchLoginTerm, searchEmailTerm } = dto;

    let filter = {};
    if (banStatus === BanStatus.Banned) {
      filter = {
        NOT: {
          UserBanInfo: {
            is: null,
          },
        },
      };
    }
    if (banStatus === BanStatus.NotBanned) {
      filter = {
        OR: [{ UserBanInfo: null }, { UserBanInfo: {} }],
      };
    }

    return {
      where: {
        OR: [
          { login: { contains: searchLoginTerm } },
          { email: { contains: searchEmailTerm } },
        ],
        ...filter,
      },
    };
  };
}
