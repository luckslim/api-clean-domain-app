import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Search Store by Location (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let Jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    Jwt = moduleRef.get(JwtService);

    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[GET] /search/store/:distance/:userLatitude/:userLongitude', async () => {
    const user = await userFactory.makePrismaUser({});

    await prisma.store.create({
      data: {
        id: 'dd871097-71af-499a-82c9-5259306e6f6a',
        city: 'new york',
        disponibility: 'disponible',
        latitude: -74.01933143882428,
        longitude: 2094583059853423,
        storeName: 'BarberStore',
        creatorId: user.id.toString(),
      },
    });
    await prisma.store.create({
      data: {
        id: '709283ed-d996-43b5-a792-bd0d300e04d9',
        city: 'new york',
        disponibility: 'disponible',
        latitude: -74.01933143882428,
        longitude: 2094583059853423,
        storeName: 'BarberStore',
        creatorId: user.id.toString(),
      },
    });
    await prisma.store.create({
      data: {
        id: '1515691f-5c01-4c0e-a051-5d52cf93b449',
        city: 'new york',
        disponibility: 'disponible',
        latitude: -74.01933143882428,
        longitude: 2094583059853423,
        storeName: 'BarberStore',
        creatorId: user.id.toString(),
      },
    });

    const token = Jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .get(`/search/store/2100/40.73127789300166/-74.01933143882428`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
