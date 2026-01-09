import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Define time (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let storeFactory: StoreFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, StoreFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    userFactory = moduleRef.get(UserFactory);

    storeFactory = moduleRef.get(StoreFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /define/time', async () => {
    const user = await userFactory.makePrismaUser({});

    const store = await storeFactory.makePrismaStore({
      creatorId: user.id.toString(),
    });

    const response = await request(app.getHttpServer())
      .post('/define/time')
      .send({
        id: user.id.toString(),
        time: '11:00',
      });

    const timeUpdated = await prisma.time.findMany({
      where: {
        storeId: store.id.toString(),
      },
    });

    expect(timeUpdated).toHaveLength(1);
    expect(response.statusCode).toBe(201);
  });
});
