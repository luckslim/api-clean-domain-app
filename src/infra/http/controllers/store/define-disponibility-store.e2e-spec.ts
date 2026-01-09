import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { EmployFactory } from 'test/factories/make-employ-aproved';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Define disponibility from store (E2E)', () => {
  let app: INestApplication;
  let userfactory: UserFactory;
  let storeFactory: StoreFactory;
  let employFactory: EmployFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, StoreFactory, EmployFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userfactory = moduleRef.get(UserFactory);

    storeFactory = moduleRef.get(StoreFactory);

    employFactory = moduleRef.get(EmployFactory);

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /create/store', async () => {
    const user = await userfactory.makePrismaUser({
      typeUser: 'creatorStore',
    });

    const userEmploy = await userfactory.makePrismaUser({
      typeUser: 'employeeStore',
    });

    const store = await storeFactory.makePrismaStore({
      creatorId: user.id.toString(),
      disponibility: 'indisponible',
    });

    const employ = await employFactory.makePrismaEmploy({
      storeId: store.id.toString(),
      userId: userEmploy.id.toString(),
      disponibility: 'indisponible',
    });

    const response = await request(app.getHttpServer())
      .post('/disponibility/store')
      .send({
        id: store.id.toString(),
        disponibility: 'disponible',
      });

    const storePrisma = await prisma.store.findMany({
      where: {
        id: store.id.toString(),
      },
    });

    expect(storePrisma).toHaveLength(1);
    expect(response.statusCode).toBe(201);
  });
});
