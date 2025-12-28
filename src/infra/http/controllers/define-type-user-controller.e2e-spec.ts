import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Define Type User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[POST] /define/type/account', async () => {
    const user = await userFactory.makePrismaUser({});

    const token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .set('Authorization', `Bearer ${token}`)
      .post('/define/type/accounts')
      .send({
        typeUser: 'creatorStore',
      });

    const userDefineTyped = await prisma.user.findFirst({
      where: {
        id: user.id.toString(),
      },
    });

    expect(userDefineTyped.typeUser).toBe('creatorStore');
    expect(response.statusCode).toBe(200);
  });
});
