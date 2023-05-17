import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { UserRequest } from './request';
import { SaEndpoints } from '../libs/shared/endpoints';
import { createUserData } from './prepared-data/prepared-user.data';
import {
  incorrectSaData,
  preparedSaData,
} from './prepared-data/prepared-sa.data';
import { viewUser } from './expect-data';

describe('AppController (e2e)', () => {
  const second = 1000;
  jest.setTimeout(10 * second);

  let app: INestApplication;
  let server;

  let userRequest: UserRequest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = await app.getHttpServer();
    userRequest = new UserRequest(server);
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`"${SaEndpoints.create()}". Create user by SA.`, () => {
    it(`Expect: ${HttpStatus.UNAUTHORIZED}. User with no access tries to create a user.`, async () => {
      const { status } = await userRequest.createUser(
        createUserData.valid,
        incorrectSaData,
      );
      expect(HttpStatus.UNAUTHORIZED).toBe(status);
    });

    it(`Expect: ${HttpStatus.BAD_REQUEST}. SA try create user with incorrect input (short) data.`, async () => {
      const { status } = await userRequest.createUser(
        createUserData.short,
        preparedSaData,
      );
      expect(HttpStatus.BAD_REQUEST).toBe(status);
    });

    it(`Expect: ${HttpStatus.BAD_REQUEST}. SA try create user with incorrect input (long) data.`, async () => {
      const { status } = await userRequest.createUser(
        createUserData.long,
        preparedSaData,
      );
      expect(HttpStatus.BAD_REQUEST).toBe(status);
    });

    it(`Expect: ${HttpStatus.CREATED}. Create and return new user`, async () => {
      const createUserDto = createUserData.valid;
      const { body, status } = await userRequest.createUser(
        createUserDto,
        preparedSaData,
      );
      expect(HttpStatus.CREATED).toBe(status);
      expect(viewUser(createUserDto)).toStrictEqual(body);
    });
  });

  describe(`"${SaEndpoints.create()}". Get users.`, () => {
    it(`Expect: ${HttpStatus.OK}. Return all user`, async () => {
      const { body, status } = await userRequest.getUsers(
          {},
          preparedSaData
      );
      console.log(body);
      expect(HttpStatus.OK).toBe(status);
    });
  });
});
