import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Update User (E2E)', () => {
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

  test('[POST] /update/account', async () => {
    const user = await userFactory.makePrismaUser({});

    const response = await request(app.getHttpServer())
      .post('/update/accounts')
      .send({
        id: user.id.toString(),
        name: 'new Name',
        userName: 'new UserName',
        email: 'newEmail@gmail.com',
        password: 'new1234',
      });

    const userUpdated = await prisma.user.findFirst({
      where: {
        id: user.id.toString(),
      },
    });

    expect(userUpdated.name).toBe('new Name');
    expect(response.statusCode).toBe(200);
  });
});
