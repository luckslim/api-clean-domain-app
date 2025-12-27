import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Fetch User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[GET] /fetch/account', async () => {
    const user = await userFactory.makePrismaUser({});

    const response = await request(app.getHttpServer())
      .post('/fetch/accounts')
      .send({
        id: user.id.toString(),
      });

    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
