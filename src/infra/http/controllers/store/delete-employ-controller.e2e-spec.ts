import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { EmployeeFactory } from 'test/factories/make-employ';
import { EmployFactory } from 'test/factories/make-employ-aproved';
import { StoreFactory } from 'test/factories/make-store';
import { UserFactory } from 'test/factories/make-user';

describe('Delete Employ (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let storeFactory: StoreFactory;
  let userFactory: UserFactory;
  let employFactory: EmployFactory;
  let employeeFactory: EmployeeFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StoreFactory,
        UserFactory,
        JwtService,
        EmployFactory,
        EmployeeFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    storeFactory = moduleRef.get(StoreFactory);

    userFactory = moduleRef.get(UserFactory);

    employFactory = moduleRef.get(EmployFactory);

    employeeFactory = moduleRef.get(EmployeeFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /delete/employ', async () => {
    const user = await userFactory.makePrismaUser({});

    const userEmploy = await userFactory.makePrismaUser({
      typeUser: 'employeeStore',
    });

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

    const employee = await employeeFactory.makePrismaEmployee({
      storeId: store.id,
      typeUser: 'employeeStore',
      employeeId: userEmploy.id.toString(),
    });

    const employ = await employFactory.makePrismaEmploy({
      storeId: store.id,
      userId: userEmploy.id.toString(),
    });

    const access_token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/delete/employ')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        id: employ.id.toString(),
      });

    const employPrisma = await prisma.employ.findMany({
      where: {
        id: employ.id.toString(),
      },
    });

    const employeePrisma = await prisma.employee.findMany({
      where: {
        id: employee.id.toString(),
      },
    });

    expect(response.statusCode).toBe(204);
    expect(employPrisma).toHaveLength(0);
    expect(employeePrisma).toHaveLength(0);
  });
});
