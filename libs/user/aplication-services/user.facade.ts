import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto } from "./commands/dto/create-user.dto";
import { CreateUserCommand, CreateUserCommandHandler } from "./commands";

@Injectable()
export class UserFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  commands = {
    createUser: (user: CreateUserDto, isSA: boolean) => this.createUser(user, isSA)
  }

  private createUser(user: CreateUserDto, isSA: boolean) {
    return this.commandBus.execute<CreateUserCommand, CreateUserCommandHandler['execute']>(new CreateUserCommand(user, isSA))
  }
}