export interface IUserEmailConfirmationInterface {
  userId: string
  confirmationCode: string
  expirationDate: string
  isConfirmed: boolean
}