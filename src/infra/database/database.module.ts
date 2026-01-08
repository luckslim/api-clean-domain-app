import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { userRepository } from '@/domain/aplication/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { dayRepository } from '@/domain/aplication/repositories/day-repository';
import { PrismaDayRepository } from './prisma/repositories/prisma-day-repository';
import { timeRepository } from '@/domain/aplication/repositories/time-repository';
import { PrismaTimeRepository } from './prisma/repositories/prisma-time-repository';
import { employAprovedRepository } from '@/domain/aplication/repositories/employ-aproved-repository';
import { PrismaEmployRepository } from './prisma/repositories/prisma-employ-repository';
import { employeeRepository } from '@/domain/aplication/repositories/employee-repository';
import { PrismaEmployeeRepository } from './prisma/repositories/prisma-employee-repository';
import { PrismaFileRepository } from './prisma/repositories/prisma-file-repository';
import { fileRepository } from '@/domain/aplication/repositories/file-repository';
import { storeRepository } from '@/domain/aplication/repositories/store-repository';
import { PrismaStoreRepository } from './prisma/repositories/prisma-store-repository';
import { scheduleRepository } from '@/domain/aplication/repositories/schedule-repository';
import { PrismaScheduleRepository } from './prisma/repositories/prisma-schedule-repository';
import { NotificationRepository } from '@/domain/aplication/repositories/notification-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { MongoService } from './mongo/mongo.service';
import { EnvModule } from '../env/env.module';
import { MongoGeographyRepository } from './mongo/repositories/mongo-geography-repository';
import { geographyRepository } from '@/domain/aplication/repositories/geography-repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    MongoService,
    { provide: userRepository, useClass: PrismaUserRepository },
    { provide: dayRepository, useClass: PrismaDayRepository },
    { provide: timeRepository, useClass: PrismaTimeRepository },
    { provide: employAprovedRepository, useClass: PrismaEmployRepository },
    { provide: employeeRepository, useClass: PrismaEmployeeRepository },
    { provide: fileRepository, useClass: PrismaFileRepository },
    { provide: storeRepository, useClass: PrismaStoreRepository },
    { provide: scheduleRepository, useClass: PrismaScheduleRepository },
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
    { provide: geographyRepository, useClass: MongoGeographyRepository },
  ],
  exports: [
    PrismaService,
    MongoService,
    userRepository,
    dayRepository,
    timeRepository,
    employAprovedRepository,
    employeeRepository,
    fileRepository,
    storeRepository,
    scheduleRepository,
    NotificationRepository,
    geographyRepository,
  ],
})
export class DatabaseModule {}
