import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { ViewPage } from '../../../../shared/pagination/view-page';
import { ViewUser } from '../../../../../src/api/controllers/sa/users/response';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, ViewPage<ViewUser>>
{
  private readonly logger = new Logger(GetUsersQueryHandler.name);
  private readonly prisma = new PrismaClient();

  async execute({ queryDto }: GetUsersQuery): Promise<ViewPage<ViewUser>> {
    const result = await this.prisma.user.findMany({
      select: { password: false },
      include: {userBanInfo: true},
      skip: queryDto.skip,
      take: queryDto.pageSize
    });
    // @ts-ignore
    return result
  }
}
