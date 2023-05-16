import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { UserAggregate } from "../../../domain";
import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserEmailConfirmationAggregate } from "../../../domain/user-email-confirmation.aggregate";
import { randomUUID } from "crypto";
import { getExpirationDate } from "../../../../shared";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, UserAggregate>
{
  private readonly prisma = new PrismaClient()
  private readonly logger = new Logger()

  async execute({ user, isSA }: CreateUserCommand): Promise<UserAggregate> {
    const userAggregate = UserAggregate.create(user)
    console.log(userAggregate);
    // let emailConfirmationAggregate
    // if (!isSA) {
    //   emailConfirmationAggregate = UserEmailConfirmationAggregate.create()
    // } else {
    //   emailConfirmationAggregate = UserEmailConfirmationAggregate.create({
    //     userId: userAggregate.id,
    //     confirmationCode: randomUUID(),
    //     expirationDate: getExpirationDate(),
    //     isConfirmed: false
    //   })
    // }

    const createdUser = await this.prisma.user.create({data: userAggregate}).catch(err => {
      this.logger.error(err)
    })
    console.log(createdUser);
    // const createdUser = this.prisma.user
    //   .create({data: userAggregate, userEmailConfirmation: {create: emailConfirmationAggregate}}).catch(err => {
    //     this.logger.error(err)
    //   })

    // const createdEmailConfirmation = this.prisma.userEmailConfirmation.create({data: emailConfirmationAggregate}).catch(err => {
    //   this.logger.error(err)
    // })

    //await this.prisma.$transaction([createdUser, createdEmailConfirmation])

    //await this.prisma.$transaction([this.prisma.user.create({data: userAggregate}), this.prisma.userEmailConfirmation.create({data: emailConfirmationAggregate})])

    // @ts-ignore
    return createdUser
  }
}