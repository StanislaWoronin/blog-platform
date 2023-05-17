import { faker } from '@faker-js/faker';
import { validationConstant } from "../../libs/shared";

export const preparedUserData = {
  createUserData: {
    valid: {
      login: 'UserLogin',
      password: 'UserPassword',
      email: 'somemail@mail.com'
    },
    short: {
      login: faker.string.alpha(Number(validationConstant.loginLength.min) - 1),
      password: faker.string.alpha(Number(validationConstant.passwordLength.min) - 1),
      email: 'somemailmail.com'
    },
    long: {
      login: faker.string.alpha(Number(validationConstant.loginLength.max) + 1),
      password: faker.string.alpha(Number(validationConstant.passwordLength.max) + 1),
      email: 'somemailmail.com'
    }
  }
}