import { Module, OnModuleInit } from "@nestjs/common";
import { CommandBus, CqrsModule, QueryBus } from "@nestjs/cqrs";
import { USER_COMMANDS_HANDLERS } from "./aplication-services/commands";
import { UserFacade } from "./aplication-services";
import { userFacadeFactory } from "./aplication-services/providers/user-facade.factory";
import { ProvidersModule } from "../providers/providers.module";

@Module({
  imports: [CqrsModule, ProvidersModule],
  providers: [
    ...USER_COMMANDS_HANDLERS,
    {
      provide: UserFacade,
      inject: [CommandBus, QueryBus],
      useFactory: userFacadeFactory
    }
  ],
  exports: [UserFacade],
})

export class UserModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  onModuleInit(): any {
    this.commandBus.register();
    this.queryBus.register();
  }
}