import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { userRepository } from '@/domain/aplication/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    { provide: userRepository, useClass: PrismaUserRepository },
  ],
  exports: [PrismaService, userRepository],
})
export class DatabaseModule {}
