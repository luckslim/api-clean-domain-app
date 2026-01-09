import { AppModule } from '@/app.module';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { EmployeeFactory } from 'test/factories/make-employ';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Create employ (E2E)', () => {
  let app: INestApplication;
  let userfactory: UserFactory;
  let storeFactory: StoreFactory;
  let employeeFactory: EmployeeFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, StoreFactory, EmployeeFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userfactory = moduleRef.get(UserFactory);

    storeFactory = moduleRef.get(StoreFactory);

    employeeFactory = moduleRef.get(EmployeeFactory);

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
    });

    const employee = await employeeFactory.makePrismaEmployee({
      employeeId: userEmploy.id.toString(),
      status: 'pending',
      storeId: store.id.toString(),
      typeUser: 'employeeStore',
    });

    const response = await request(app.getHttpServer())
      .post('/create/employ')
      .send({
        storeId: store.id.toString(),
        userId: employee.employeeId,
        disponibility: 'indisponible',
        score: '0',
      });

    const employPrisma = await prisma.employ.findMany({
      where: {
        storeId: store.id.toString(),
      },
    });

    expect(employPrisma).toHaveLength(1);
    expect(response.statusCode).toBe(201);
  });
});
