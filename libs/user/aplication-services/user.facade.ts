import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './commands/dto/create-user.dto';
import { CreateUserCommand, CreateUserCommandHandler } from './commands';
import { ViewUser } from '../../../src/api/controllers/sa/users/response';
import { UserQueryDto } from '../../../src/api/controllers/sa/users/dto/query';
import { GetUsersQuery, GetUsersQueryHandler } from './queries';

@Injectable()
export class UserFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  commands = {
    createUser: (user: CreateUserDto, isSA: boolean) =>
      this.createUser(user, isSA),
  };

  query = {
    getUsers: (queryDto: UserQueryDto) => this.getUsers(queryDto),
  };

  private createUser(user: CreateUserDto, isSA: boolean) {
    return this.commandBus.execute<
      CreateUserCommand,
      CreateUserCommandHandler['execute']
    >(new CreateUserCommand(user, isSA));
  }

  private getUsers(queryDto: UserQueryDto) {
    return this.queryBus.execute<
      GetUsersQuery,
      GetUsersQueryHandler['execute']
    >(new GetUsersQuery(queryDto));
  }
}
