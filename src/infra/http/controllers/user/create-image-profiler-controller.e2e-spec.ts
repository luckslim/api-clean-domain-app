import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Create image profiler (E2E)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory);

    jwt = moduleRef.get(JwtService);

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /upload/image/profiler', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'lucas Soares Lima',
      userName: 'lucasSL-02',
    });

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/upload/image/profiler')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/profile.jpg');

    const filePrisma = await prisma.files.findMany({
      where: { userId: user.id.toString() },
    });

    expect(filePrisma).toHaveLength(1);
    expect(response.statusCode).toBe(201);
  });
});
