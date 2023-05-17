import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserAggregate } from '../../../domain';
import { PrismaClient } from '@prisma/client';
import { UserEmailConfirmationAggregate } from '../../../domain/user-email-confirmation.aggregate';
import { randomUUID } from 'crypto';
import { getExpirationDate } from '../../../../shared/helpers';
import { ViewUser } from '../../../../../src/api/controllers/sa/users/response';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, ViewUser>
{
  private readonly prisma = new PrismaClient();

  async execute({ user, isSA }: CreateUserCommand): Promise<ViewUser> {
    const userAggregate = UserAggregate.create(user);

    const emailConfirmationAggregate = !isSA
      ? UserEmailConfirmationAggregate.create()
      : UserEmailConfirmationAggregate.create({
          userId: userAggregate.id,
          confirmationCode: randomUUID(),
          expirationDate: getExpirationDate(),
          isConfirmed: false,
        });

    const [createdUser] = await this.prisma.$transaction([
      this.prisma.user.create({ data: userAggregate }),
      this.prisma.userEmailConfirmation.create({
        data: emailConfirmationAggregate,
      }),
    ]);

    const _createdUser = ViewUser.viewUser(createdUser);
    return _createdUser;
  }
}
