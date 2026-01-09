import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { EmployeeFactory } from 'test/factories/make-employ';
import { EmployFactory } from 'test/factories/make-employ-aproved';
import { NotificationFactory } from 'test/factories/make-notification';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Define type status from employ (E2E)', () => {
  let app: INestApplication;
  let userfactory: UserFactory;
  let storeFactory: StoreFactory;
  let employFactory: EmployFactory;
  let employeeFactory: EmployeeFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, StoreFactory, EmployFactory, EmployeeFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userfactory = moduleRef.get(UserFactory);

    storeFactory = moduleRef.get(StoreFactory);

    employFactory = moduleRef.get(EmployFactory);

    employeeFactory = moduleRef.get(EmployeeFactory);

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /define/type/status -> aproved', async () => {
    const user = await userfactory.makePrismaUser({
      typeUser: 'creatorStore',
    });

    const userEmployee = await userfactory.makePrismaUser({
      typeUser: 'employeeStore',
    });

    const store = await storeFactory.makePrismaStore({
      creatorId: user.id.toString(),
    });

    const employee = await employeeFactory.makePrismaEmployee({
      employeeId: userEmployee.id.toString(),
      storeId: store.id.toString(),
      status: 'pending',
    });

    const response = await request(app.getHttpServer())
      .post('/define/type/status')
      .send({
        id: employee.id.toString(),
        status: 'aproved',
      });

    const employeePrisma = await prisma.employee.findMany({
      where: {
        id: employee.id.toString(),
      },
    });

    const employPrisma = await prisma.employ.findMany({
      where: {
        storeId: store.id.toString(),
      },
    });

    const notificationPrisma = await prisma.notification.findMany({
      where: {},
    });

    expect(response.statusCode).toBe(201);
    expect(employeePrisma[0].status).toBe('aproved');
    expect(employPrisma[0].disponibility).toBe('indisponible');
    expect(notificationPrisma).toHaveLength(1);
  });

  test('[POST] /define/type/status -> reject', async () => {
    const user = await userfactory.makePrismaUser({
      typeUser: 'creatorStore',
    });

    const userEmployee = await userfactory.makePrismaUser({
      typeUser: 'employeeStore',
    });

    const store = await storeFactory.makePrismaStore({
      creatorId: user.id.toString(),
    });

    const employee = await employeeFactory.makePrismaEmployee({
      employeeId: userEmployee.id.toString(),
      storeId: store.id.toString(),
      status: 'pending',
    });

    const response = await request(app.getHttpServer())
      .post('/define/type/status')
      .send({
        id: employee.id.toString(),
        status: 'reject',
      });

    const employeePrisma = await prisma.employee.findMany({
      where: {
        id: employee.id.toString(),
      },
    });

    const employPrisma = await prisma.employ.findMany({
      where: {
        storeId: store.id.toString(),
      },
    });

    const notificationPrisma = await prisma.notification.findMany({
      where: {},
    });

    expect(response.statusCode).toBe(201);
    expect(employeePrisma[0].status).toBe('reject');
    expect(employPrisma).toHaveLength(0);
    expect(notificationPrisma).toHaveLength(2);
  });
});
