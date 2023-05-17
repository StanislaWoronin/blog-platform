import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { ViewPage } from '../../../../shared/pagination/view-page';
import { ViewUser } from '../../../../../src/api/controllers/sa/users/response';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserQueryDto } from '../../../../../src/api/controllers/sa/users/dto/query';
import { BanStatus } from '../../../../shared/enum';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, ViewPage<ViewUser>>
{
  private readonly logger = new Logger(GetUsersQueryHandler.name);
  private readonly prisma = new PrismaClient();

  async execute({ queryDto }: GetUsersQuery): Promise<ViewPage<ViewUser>> {
    const filter = this.getFilter(queryDto);
    console.log(queryDto.skip);
    const users = await this.prisma.user.findMany({
      where: {},
      include: {
        UserBanInfo: {
          select: {
            banDate: true,
            banReason: true,
          },
        },
      },
      orderBy: {},
      take: Number(queryDto.pageSize),
      //skip: Number(queryDto.skip),
    });

    // const query = `
    //   SELECT u.id, u.login, u.email, u."createdAt",
    //          bi."banDate", bi."banReason"
    //     FROM User u
    //     LEFT JOIN UserBanInfo bi
    //       ON u.id = bi."userId"
    //       ${filter}
    //    ORDER BY "${queryDto.sortBy}" ${queryDto.sortDirection}
    //    LIMIT ${queryDto.pageSize} OFFSET ${queryDto.skip};
    // `;
    // const users = await this.prisma
    //   .$queryRawUnsafe(query)
    //   .catch((err) => this.logger.error(err));
    // @ts-ignore
    return users;
  }

  private getFilter(query: UserQueryDto): string {
    const { banStatus, searchLoginTerm, searchEmailTerm } = query;
    const banStatusFilter = this.getBanStatusFilter(banStatus);
    const searTermFilter = this.getSearchTermFilter(
      searchLoginTerm,
      searchEmailTerm,
    );

    if (banStatusFilter && searTermFilter) {
      return `WHERE ${banStatusFilter} AND ${searTermFilter}`;
    }
    if (banStatusFilter) {
      return `WHERE ${banStatusFilter}`;
    }
    if (searTermFilter) {
      return `WHERE ${searTermFilter}`;
    }

    return '';
  }

  private getBanStatusFilter(banStatus: BanStatus): string {
    if (banStatus === BanStatus.NotBanned) {
      return `bi."banDate" isNull`;
    }
    if (banStatus === BanStatus.Banned) {
      return `bi."banDate" notNull`;
    }
    return '';
  }

  private getSearchTermFilter(
    searchLoginTerm: string,
    searchEmailTerm: string,
  ): string {
    const searchLoginFilter = `u.login ILIKE '%${searchLoginTerm}%'`;
    const searchEmailFilter = `u.email ILIKE '%${searchEmailTerm}%'`;

    if (searchLoginTerm && searchEmailTerm) {
      return `${searchLoginFilter} OR ${searchEmailFilter}`;
    }
    if (searchLoginTerm) {
      return `${searchLoginFilter}`;
    }
    if (searchEmailTerm) {
      return `${searchEmailFilter}`;
    }
    return '';
  }
}
