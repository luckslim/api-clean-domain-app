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
import { AuthenticateController } from './controllers/user/authenticate-user-controller';
import { AuthenticateUserUseCase } from '@/domain/aplication/use-cases/user/authenticate-use-case';
import { DefineTypeUserController } from './controllers/define-type-user-controller';
import { ChangeTypeUserUseCase } from '@/domain/aplication/use-cases/user/change-type-user-use-case';
import { StorageModule } from '../storage/storage.module';
import { CreateImageProfilerController } from './controllers/user/create-image-profiler-controller';
import { UploadImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/create-image-user-profile';
import { DeleteImageProfilerController } from './controllers/delete-image-profiler-controller';
import { DeleteImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/delete-image-user-profile';
import { GetImageProfilerController } from './controllers/get-image-profiler-controller';
import { GetImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/get-image-user-profile';
import { CreateStoreController } from './controllers/store/create-store-controller';
import { CreateStoreUseCase } from '@/domain/aplication/use-cases/store/create-store-use-case';
import { SearchStoreByDistanceProfilerController } from './controllers/search-store-by-distance-controller';
import { SearchStoreLocationUseCase } from '@/domain/aplication/use-cases/store/search-store-location';
import { DeleteStoreController } from './controllers/store/delete-store-controller';
import { DeleteStoreUseCase } from '@/domain/aplication/use-cases/store/delete-store-use-case';
import { DefineDayOfScheduleController } from './controllers/store/define-day-of-schedule-controller';
import { DefineDayStoreUseCase } from '@/domain/aplication/use-cases/store/define-days-of-schedule-use-case';
import { CreateEmployController } from './controllers/store/create-employ-controller';
import { CreateEmployUseCase } from '@/domain/aplication/use-cases/store/create-employ-aproved';
import { DefineDisponibilityEmployController } from './controllers/store/define-disponibility-employ';
import { DefineDisponibilityEmployUseCase } from '@/domain/aplication/use-cases/store/define-disponibility-employ-use-case';
import { DefineDisponibilityStoreController } from './controllers/store/define-disponibility-store';
import { DefineDisponibilityStoreUseCase } from '@/domain/aplication/use-cases/store/define-disponibility-store-use-case';
import { DefineTimeOfScheduleController } from './controllers/store/define-time-of-schedule-controller';
import { DefineTimeStoreUseCase } from '@/domain/aplication/use-cases/store/define-time-of-schedule-use-case';
import { DefineTypeStatusEmployController } from './controllers/store/define-type-status-employee-in-store-controller';
import { DefineTypeStatusEmployUseCase } from '@/domain/aplication/use-cases/store/define-type-status-employee-in-store';
import { DeleteDayController } from './controllers/store/delete-days-of-schedule-constroller';
import { DeleteDayStoreUseCase } from '@/domain/aplication/use-cases/store/delete-days-of-schedule-use-case';
import { DeleteEmployController } from './controllers/store/delete-employ-controller';
import { DeleteEmployUseCase } from '@/domain/aplication/use-cases/store/delete-employ-use-case';
import { DeleteTimeController } from './controllers/store/delete-time-of-schedule-controller';
import { DeleteTimeStoreUseCase } from '@/domain/aplication/use-cases/store/delete-time-of-schedule-use-case';
import { EditStoreController } from './controllers/store/edit-store-controller';
import { EditStoreUseCase } from '@/domain/aplication/use-cases/store/edit-store-use-case';
import { GetEmployeesController } from './controllers/store/get-employs-by-userId.controller';
import { GetEmployUseCase } from '@/domain/aplication/use-cases/store/get-employ-by-id';

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
    CreateStoreController,
    SearchStoreByDistanceProfilerController,
    DeleteStoreController,
    DefineDayOfScheduleController,
    CreateEmployController,
    DefineDisponibilityEmployController,
    DefineDisponibilityStoreController,
    DefineTimeOfScheduleController,
    DefineTypeStatusEmployController,
    DeleteDayController,
    DeleteEmployController,
    DeleteTimeController,
    EditStoreController,
    GetEmployeesController,
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
    CreateStoreUseCase,
    SearchStoreLocationUseCase,
    DeleteStoreUseCase,
    DefineDayStoreUseCase,
    CreateEmployUseCase,
    DefineDisponibilityEmployUseCase,
    DefineDisponibilityStoreUseCase,
    DefineTimeStoreUseCase,
    DefineTypeStatusEmployUseCase,
    DeleteDayStoreUseCase,
    DeleteEmployUseCase,
    DeleteTimeStoreUseCase,
    EditStoreUseCase,
    GetEmployUseCase,
  ],
})
export class HttpModule {}
