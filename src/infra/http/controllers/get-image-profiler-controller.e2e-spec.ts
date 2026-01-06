import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { FileFactory } from 'test/factories/make-file';
import { UserFactory } from 'test/factories/make-user';

describe('Fetch User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let fileFactory: FileFactory;
  let Jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, JwtService, FileFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    Jwt = moduleRef.get(JwtService);

    userFactory = moduleRef.get(UserFactory);

    fileFactory = moduleRef.get(FileFactory);

    await app.init();
  });

  test('[GET] /get/image/accounts', async () => {
    const user = await userFactory.makePrismaUser({});

    const file = await fileFactory.makePrismaFile({
      userId: user.id.toString(),
      fileName: 'lucas Soares Lima-7dacce41-9c43-49db-b29e-7aa0f439705b',
      userName: user.userName,
    });

    const token = Jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .get(`/get/image/${file.userName}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBeTypeOf('string');
  });
});
