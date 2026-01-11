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

describe('Create employ (E2E)', () => {
  let app: INestApplication;
  let userfactory: UserFactory;
  let storeFactory: StoreFactory;
  let employeeFactory: EmployeeFactory;
  let jwt: JwtService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, StoreFactory, EmployeeFactory, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();

    userfactory = moduleRef.get(UserFactory);

    storeFactory = moduleRef.get(StoreFactory);

    employeeFactory = moduleRef.get(EmployeeFactory);

    jwt = moduleRef.get(JwtService);

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /create/store', async () => {
    const user = await userfactory.makePrismaUser({
      typeUser: 'creatorStore',
    });

    const store = await storeFactory.makePrismaStore({
      creatorId: user.id.toString(),
    });

    for (let i = 0; i < 10; i++) {
      const userEmploy = await userfactory.makePrismaUser({
        typeUser: 'employeeStore',
      });

      await employeeFactory.makePrismaEmployee({
        employeeId: userEmploy.id.toString(),
        storeId: store.id.toString(),
      });
    }

    const access_Token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .get('/get/request/employ')
      .set('Authorization', `Bearer ${access_Token}`);

    const employPrisma = await prisma.employee.findMany({
      where: {
        storeId: store.id.toString(),
      },
    });

    expect(employPrisma).toHaveLength(10);
    expect(response.statusCode).toBe(200);
  });
});
