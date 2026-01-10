import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { FileFactory } from 'test/factories/make-file';
import { UserFactory } from 'test/factories/make-user';

describe('Delete image from User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let fileFactory: FileFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, FileFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    userFactory = moduleRef.get(UserFactory);

    fileFactory = moduleRef.get(FileFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /delete/account', async () => {
    const user = await userFactory.makePrismaUser({});

    const file = await fileFactory.makePrismaFile({
      userId: user.id.toString(),
      fileName: 'lucas Soares Lima-9a71989a-5b76-4406-bc0c-086c8990cf58',
    });

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/delete/image/accounts')
      .set('Authorization', `Bearer ${accessToken}`);

    const searchFile = await prisma.files.findFirst({
      where: {
        id: file.id.toString(),
      },
    });

    expect(searchFile).toBe(null);
    expect(response.statusCode).toBe(204);
  });
});
