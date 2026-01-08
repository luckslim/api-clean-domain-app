import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Create Store (E2E)', () => {
  let app: INestApplication;
  let userfactory: UserFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userfactory = moduleRef.get(UserFactory);

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /create/store', async () => {
    const user = await userfactory.makePrismaUser({
      typeUser: 'creatorStore',
    });
    const response = await request(app.getHttpServer())
      .post('/create/store')
      .send({
        creatorId: user.id.toString(),
        storeName: 'BarberStore',
        city: 'New York',
        latitude: '40.71327789300166',
        longitude: '-74.01933143882428',
      });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
  });
});
