import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Get Store employ (E2E)', () => {
  let app: INestApplication;
  let userfactory: UserFactory;
  let storeFactory: StoreFactory;
  let jwt: JwtService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, StoreFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    userfactory = moduleRef.get(UserFactory);

    storeFactory = moduleRef.get(StoreFactory);

    jwt = moduleRef.get(JwtService);

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /get/store', async () => {
    const user = await userfactory.makePrismaUser({
      typeUser: 'creatorStore',
    });

    const store = await storeFactory.makePrismaStore({
      creatorId: user.id.toString(),
    });

    const access_Token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer()).get(
      `/get/store/by/${store.storeName}`,
    );

    const storePrisma = await prisma.store.findMany({
      where: {
        creatorId: user.id.toString(),
      },
    });

    expect(storePrisma).toHaveLength(1);
    expect(response.statusCode).toBe(200);
  });
});
