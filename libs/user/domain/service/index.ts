import { AggregateRoot } from '@nestjs/cqrs';
import { IPlainToInstance, PLAIN_TO_INSTANCE } from "./plain-to-instance.case";

export class UserService extends AggregateRoot implements IPlainToInstance {
  plainToInstance = PLAIN_TO_INSTANCE
}
