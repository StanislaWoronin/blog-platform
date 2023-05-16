import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  const second = 1000;
  jest.setTimeout(10 * second);

  let app: INestApplication;
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = await app.getHttpServer();
  });

  it('', async () => {
    const response = await request(server).post('/sa/users').send({
      login: 'u',
      password: ' us',
      email: 'somemailmail.com',
    });
    console.log(response.body);
  });
});
