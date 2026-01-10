import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { TimeFactory } from 'test/factories/make-time';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Delete Time (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let storeFactory: StoreFactory;
  let userFactory: UserFactory;
  let timeFactory: TimeFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StoreFactory, UserFactory, TimeFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    storeFactory = moduleRef.get(StoreFactory);

    userFactory = moduleRef.get(UserFactory);

    timeFactory = moduleRef.get(TimeFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /delete/Time', async () => {
    const user = await userFactory.makePrismaUser({});

    const store = await prisma.store.create({
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

    const time = await timeFactory.makePrismaTime({
      storeId: store.id,
    });

    const access_token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/delete/time')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        id: time.id.toString(),
      });

    const timePrisma = await prisma.time.findMany({
      where: {
        id: time.id.toString(),
      },
    });

    expect(response.statusCode).toBe(204);
    expect(timePrisma).toHaveLength(0);
  });
});
