import { IUserEmailConfirmationInterface } from './user-email-confirmation.interface';

export class UserEmailConfirmationAggregate
  implements IUserEmailConfirmationInterface
{
  confirmationCode = null;
  expirationDate: string;
  isConfirmed = true;
  userId: string;


  static create(emailConfirmation?: Partial<IUserEmailConfirmationInterface>) {
    const _emailConfirmation = new UserEmailConfirmationAggregate();
    if (!emailConfirmation) {
      return _emailConfirmation;
    }
    Object.assign(_emailConfirmation, emailConfirmation);
    return _emailConfirmation;
  }
}
