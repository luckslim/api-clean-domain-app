import { AppModule } from '@/app.module';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { DayFactory } from 'test/factories/make-day';
import { EmployeeFactory } from 'test/factories/make-employ';
import { EmployFactory } from 'test/factories/make-employ-aproved';
import { NotificationFactory } from 'test/factories/make-notification';
import { ScheduleFactory } from 'test/factories/make-schedule';
import { StoreFactory } from 'test/factories/make-store';
import { TimeFactory } from 'test/factories/make-time';
import { UserFactory } from 'test/factories/make-user';

describe('Define Type User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let scheduleFactory: ScheduleFactory;
  let storeFactory: StoreFactory;
  let notificationFactory: NotificationFactory;
  let employFactory: EmployFactory;
  let employeeFactory: EmployeeFactory;
  let timeFactory: TimeFactory;
  let dayFactory: DayFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UserFactory,
        JwtService,
        ScheduleFactory,
        StoreFactory,
        NotificationFactory,
        EmployFactory,
        EmployeeFactory,
        TimeFactory,
        DayFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    userFactory = moduleRef.get(UserFactory);

    scheduleFactory = moduleRef.get(ScheduleFactory);

    storeFactory = moduleRef.get(StoreFactory);

    timeFactory = moduleRef.get(TimeFactory);

    dayFactory = moduleRef.get(DayFactory);

    employFactory = moduleRef.get(EmployFactory);

    employeeFactory = moduleRef.get(EmployeeFactory);

    notificationFactory = moduleRef.get(NotificationFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /define/type/accounts, should be able change type from user to creatorStore', async () => {
    const user = await userFactory.makePrismaUser({
      typeUser: 'user',
    });

    const userCreator = await userFactory.makePrismaUser({
      typeUser: 'creatorStore',
    });

    const userEmploy = await userFactory.makePrismaUser({
      typeUser: 'employeeStore',
    });

    const store = await storeFactory.makePrismaStore({
      creatorId: userCreator.id.toString(),
    });

    const employ = await employFactory.makePrismaEmploy({
      userId: userEmploy.id.toString(),
      storeId: store.id.toString(),
    });

    const time = await timeFactory.makePrismaTime({
      storeId: store.id.toString(),
    });

    const schedule = await scheduleFactory.makePrismaSchedule({
      userId: user.id.toString(),
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      time: time.id.toString(),
    });

    const token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/define/type/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        typeUser: 'creatorStore',
      });

    const userDefineTyped = await prisma.user.findFirst({
      where: {
        id: user.id.toString(),
      },
    });

    const searchSchedules = await prisma.schedules.findMany({
      where: {
        userId: user.id.toString(),
      },
    });

    expect(searchSchedules).toHaveLength(0);
    expect(userDefineTyped.typeUser).toEqual('creatorStore');
    expect(response.statusCode).toBe(201);
  });

  test('[POST] /define/type/accounts, should be able change type from employ to user', async () => {
    //user normal
    const user = await userFactory.makePrismaUser({
      typeUser: 'user',
    });
    //user creator from store
    const userCreator = await userFactory.makePrismaUser({
      typeUser: 'creatorStore',
    });
    //store
    const store = await storeFactory.makePrismaStore({
      creatorId: userCreator.id.toString(),
    });
    //my Employ
    const userEmploy = await userFactory.makePrismaUser({
      typeUser: 'employeeStore',
    });
    const employ = await employFactory.makePrismaEmploy({
      userId: userEmploy.id.toString(),
      storeId: store.id.toString(),
    });
    // time configured from store
    const time = await timeFactory.makePrismaTime({
      storeId: store.id.toString(),
    });
    // schedule done from user
    const schedule = await scheduleFactory.makePrismaSchedule({
      userId: user.id.toString(),
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      time: time.id.toString(),
    });

    //token with Id from userEmploy
    const token = jwt.sign({ sub: userEmploy.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/define/type/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        typeUser: 'user',
      });

    const userDefineTyped = await prisma.user.findFirst({
      where: {
        id: userEmploy.id.toString(),
      },
    });

    const searchSchedules = await prisma.schedules.findMany({
      where: {
        userId: user.id.toString(),
      },
    });

    expect(searchSchedules).toHaveLength(0);
    expect(userDefineTyped.typeUser).toEqual('user');
    expect(response.statusCode).toBe(201);
  });

  test('[POST] /define/type/accounts, should be able change type from store to user', async () => {
    //user normal
    const user = await userFactory.makePrismaUser({
      typeUser: 'user',
    });
    //user creator from store
    const userCreator = await userFactory.makePrismaUser({
      typeUser: 'creatorStore',
    });
    //store
    const store = await storeFactory.makePrismaStore({
      creatorId: userCreator.id.toString(),
    });
    //my Employ
    const userEmploy = await userFactory.makePrismaUser({
      typeUser: 'employeeStore',
    });
    const employ = await employFactory.makePrismaEmploy({
      userId: userEmploy.id.toString(),
      storeId: store.id.toString(),
    });
    // time configured from store
    const time = await timeFactory.makePrismaTime({
      storeId: store.id.toString(),
    });
    // schedule done from user
    const schedule = await scheduleFactory.makePrismaSchedule({
      userId: user.id.toString(),
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      time: time.id.toString(),
    });

    //token with Id from userEmploy
    const token = jwt.sign({ sub: userCreator.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/define/type/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        typeUser: 'user',
      });

    const userDefineTyped = await prisma.user.findFirst({
      where: {
        id: userCreator.id.toString(),
      },
    });

    const searchSchedules = await prisma.schedules.findMany({
      where: {
        userId: user.id.toString(),
      },
    });

    const searchEmploy = await prisma.employ.findMany({
      where: {
        userId: userEmploy.id.toString(),
      },
    });

    const searchTime = await prisma.time.findMany({
      where: {
        storeId: store.id.toString(),
      },
    });

    expect(searchEmploy).toHaveLength(0);
    expect(searchSchedules).toHaveLength(0);
    expect(searchTime).toHaveLength(0);
    expect(userDefineTyped.typeUser).toEqual('user');
    expect(response.statusCode).toBe(201);
  });

  test('[POST] /define/type/accounts, should be able change type from user to employee', async () => {
    //user normal
    const user = await userFactory.makePrismaUser({
      typeUser: 'user',
    });
    //user creator from store
    const userCreator = await userFactory.makePrismaUser({
      typeUser: 'creatorStore',
    });
    //store
    const store = await storeFactory.makePrismaStore({
      creatorId: userCreator.id.toString(),
      storeName: 'bigStore',
    });
    //my Employ
    const userEmploy = await userFactory.makePrismaUser({
      typeUser: 'employeeStore',
    });
    const employ = await employFactory.makePrismaEmploy({
      userId: userEmploy.id.toString(),
      storeId: store.id.toString(),
    });
    // time configured from store
    const time = await timeFactory.makePrismaTime({
      storeId: store.id.toString(),
    });
    // schedule done from user
    const schedule = await scheduleFactory.makePrismaSchedule({
      userId: user.id.toString(),
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      time: time.id.toString(),
    });

    //token with Id from userEmploy
    const token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/define/type/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        typeUser: 'employeeStore',
        storeName: 'bigStore',
      });

    const userDefineTyped = await prisma.user.findFirst({
      where: {
        id: user.id.toString(),
      },
    });

    const searchSchedules = await prisma.schedules.findMany({
      where: {
        userId: user.id.toString(),
      },
    });

    const searchEmployee = await prisma.employee.findMany({
      where: {
        userId: user.id.toString(),
      },
    });

    const searchNotification = await prisma.notification.findMany({
      where: {
        userId: store.creatorId,
      },
    });

    expect(searchEmployee).toHaveLength(1);
    expect(searchNotification).toHaveLength(1);
    expect(searchSchedules).toHaveLength(0);
    expect(userDefineTyped.typeUser).toEqual('employeeStore');
    expect(response.statusCode).toBe(201);
  });

  test('[POST] /define/type/accounts, should not be able change type from user to employee if no exist storeName', async () => {
    //user normal
    const user = await userFactory.makePrismaUser({
      typeUser: 'user',
    });
    //user creator from store
    const userCreator = await userFactory.makePrismaUser({
      typeUser: 'creatorStore',
    });
    //store
    const store = await storeFactory.makePrismaStore({
      creatorId: userCreator.id.toString(),
    });
    //my Employ
    const userEmploy = await userFactory.makePrismaUser({
      typeUser: 'employeeStore',
    });
    const employ = await employFactory.makePrismaEmploy({
      userId: userEmploy.id.toString(),
      storeId: store.id.toString(),
    });
    // time configured from store
    const time = await timeFactory.makePrismaTime({
      storeId: store.id.toString(),
    });
    // schedule done from user
    const schedule = await scheduleFactory.makePrismaSchedule({
      userId: user.id.toString(),
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      time: time.id.toString(),
    });

    //token with Id from userEmploy
    const token = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/define/type/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        typeUser: 'employeeStore',
      });

    const userDefineTyped = await prisma.user.findFirst({
      where: {
        id: user.id.toString(),
      },
    });

    expect(userDefineTyped.typeUser).toEqual('user');
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('Resource not found. undefined');
  });
});
