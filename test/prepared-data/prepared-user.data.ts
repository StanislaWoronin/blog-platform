import { faker } from '@faker-js/faker';
import { validationConstant } from '../../libs/shared';
import { CreateUserDto } from '../../src/api/controllers/sa/users/dto';

export const createUserData = {
  valid: {
    login: 'UserLogin',
    password: 'UserPassword',
    email: 'somemail@mail.com',
  } as CreateUserDto,
  short: {
    login: faker.string.alpha(Number(validationConstant.loginLength.min) - 1),
    password: faker.string.alpha(
      Number(validationConstant.passwordLength.min) - 1,
    ),
    email: 'somemailmail.com',
  } as CreateUserDto,
  long: {
    login: faker.string.alpha(Number(validationConstant.loginLength.max) + 1),
    password: faker.string.alpha(
      Number(validationConstant.passwordLength.max) + 1,
    ),
    email: 'somemailmail.com',
  } as CreateUserDto,
};
