import { UserService } from './service';
import { IUserEmailConfirmationInterface } from './user-email-confirmation.interface';

export class UserEmailConfirmationAggregate
  extends UserService
  implements IUserEmailConfirmationInterface
{
  confirmationCode = null;
  expirationDate: string;
  isConfirmed = true;
  userId: string;

  private constructor() {
    super();
  }

  static create(emailConfirmation?: Partial<IUserEmailConfirmationInterface>) {
    const _emailConfirmation = new UserEmailConfirmationAggregate();
    if (!emailConfirmation) {
      return _emailConfirmation;
    }
    Object.assign(_emailConfirmation, emailConfirmation);
    return _emailConfirmation;
  }
}
