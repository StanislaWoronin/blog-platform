import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserFacade } from '../aplication-services/user.facade';

export const userFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus) =>
  new UserFacade(commandBus, queryBus);
