import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user-controller';
import { CreateUserUseCase } from '@/domain/aplication/use-cases/user/create-user-use-case';
import { DatabaseModule } from '../database/database.module';
import { cryptographyModule } from '../cryptography/cryptography.module';
import { DeleteUserController } from './controllers/delete-user-controller';
import { DeleteUserUseCase } from '@/domain/aplication/use-cases/user/delete-user-use-case';
import { UpdateUserController } from './controllers/update-user-controller';
import { EditUserUseCase } from '@/domain/aplication/use-cases/user/edit-user-use-case';
import { FetchUserController } from './controllers/fetch-user-controller';
import { GetUserUseCase } from '@/domain/aplication/use-cases/user/get-user-use-case';

@Module({
  imports: [DatabaseModule, cryptographyModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    FetchUserController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    GetUserUseCase,
  ],
})
export class HttpModule {}
