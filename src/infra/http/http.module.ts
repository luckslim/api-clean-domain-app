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
import { StorageModule } from '../storage/storage.module';
import { CreateImageProfilerController } from './controllers/create-image-profiler-controller';
import { UploadImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/create-image-user-profile';
import { DeleteImageProfilerController } from './controllers/delete-image-profiler-controller';
import { DeleteImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/delete-image-user-profile';
import { GetImageProfilerController } from './controllers/get-image-profiler-controller';
import { GetImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/get-image-user-profile';

@Module({
  imports: [DatabaseModule, cryptographyModule, StorageModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    FetchUserController,
    AuthenticateController,
    DefineTypeUserController,
    CreateImageProfilerController,
    DeleteImageProfilerController,
    GetImageProfilerController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    GetUserUseCase,
    AuthenticateUserUseCase,
    ChangeTypeUserUseCase,
    UploadImageUserProfileUseCase,
    DeleteImageUserProfileUseCase,
    GetImageUserProfileUseCase,
  ],
})
export class HttpModule {}
