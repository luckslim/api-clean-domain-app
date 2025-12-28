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
import { AuthenticateController } from './controllers/authenticate-user-controller';
import { AuthenticateUserUseCase } from '@/domain/aplication/use-cases/user/authenticate-use-case';
import { DefineTypeUserController } from './controllers/define-type-user-controller';
import { ChangeTypeUserUseCase } from '@/domain/aplication/use-cases/user/change-type-user-use-case';

@Module({
  imports: [DatabaseModule, cryptographyModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    FetchUserController,
    AuthenticateController,
    DefineTypeUserController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    GetUserUseCase,
    AuthenticateUserUseCase,
    ChangeTypeUserUseCase,
  ],
})
export class HttpModule {}
