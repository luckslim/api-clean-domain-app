import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from '@/domain/aplication/use-cases/user/create-user-use-case';
import { DatabaseModule } from '../database/database.module';
import { cryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, cryptographyModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
