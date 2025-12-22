import { left, right, type Either } from '@/core/either';
import { User } from '@/domain/enterprise/user-entity';
import type { userRepository } from '../../repositories/user-repository';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import type { UserTypeProps } from '@/core/types/type-user';
import type { employeeRepository } from '../../repositories/employee-repository';
import { Employee } from '@/domain/enterprise/employee-store-entity';
import type { storeRepository } from '../../repositories/store-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { ResponseStoreError } from '@/core/errors/response-store-error';
import type { NotificationRepository } from '../../repositories/notification-repository';
import { Notification } from '@/domain/enterprise/notification-entity';
import type { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import type { scheduleRepository } from '../../repositories/schedule-repository';
import type { timeRepository } from '../../repositories/time-repository';
import type { dayRepository } from '../../repositories/day-repository';

interface ChangeTypeUserRequest {
  id: string; //id from user
  typeUser: UserTypeProps;
  storeName?: string;
}

type ChangeTypeUserResponse = Either<NotAllowedError, { user: User }>;

export class ChangeTypeUserUseCase {
  constructor(
    private userRepository: userRepository,
    private employeeRepository: employeeRepository,
    private storeRepository: storeRepository,
    private notifyRepository: NotificationRepository,
    private employRepository: employAprovedRepository,
    private schedulesRepository: scheduleRepository,
    private timeRepository: timeRepository,
    private dayRepository: dayRepository,
  ) {}
  async execute({
    id,
    typeUser,
    storeName,
  }: ChangeTypeUserRequest): Promise<ChangeTypeUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError());
    }

    user.typeUser = typeUser;

    if (user.typeUser === 'creatorStore') {
      //search schedules from user
      const schedules = await this.schedulesRepository.findManyByUserId(
        user.id.toString(),
      );

      if (schedules != null) {
        await this.schedulesRepository.deleteManyById(
          schedules.map((item) => item.id.toString()),
        );
      }

      const employee = await this.employeeRepository.findByUserId(
        user.id.toString(),
      );

      if (employee != null) {
        await this.employeeRepository.delete(employee.id.toString());
      }

      const employ = await this.employRepository.findByUserId(id);

      if (employ != null) {
        await this.employRepository.delete(employ.id.toString());
      }
    }

    if (user.typeUser === 'employeeStore') {
      //search storeName existing
      const storeNameExisting =
        await this.storeRepository.findByStoreName(storeName);

      if (!storeNameExisting) {
        return left(new ResourceNotFoundError());
      }

      //search if user is creator from store
      const store = await this.storeRepository.findByUserId(user.id.toString());

      if (store != null) {
        const time = await this.timeRepository.findManyByStoreId(
          store.id.toString(),
        );

        if (time != null) {
          await this.timeRepository.deleteManyByStoreId(
            time.map((item) => item.storeId),
          );
        }

        const day = await this.dayRepository.findManyByStoreId(
          store.id.toString(),
        );

        if (day != null) {
          await this.dayRepository.deleteManyByStoreId(
            day.map((item) => item.storeId),
          );
        }

        await this.storeRepository.delete(store.id.toString());
      }

      //search schedules from user
      const schedules = await this.schedulesRepository.findManyByUserId(
        user.id.toString(),
      );

      if (schedules) {
        await this.schedulesRepository.deleteManyById(
          schedules.map((item) => item.id.toString()),
        );
      }

      const employ = await this.employeeRepository.findById(user.id.toString());

      if (!employ) {
        const employee = Employee.create({
          employeeId: user.id.toString(),
          storeId: storeNameExisting.id.toString(),
          typeUser: 'employeeStore',
          status: 'pending',
          createdAt: new Date(),
        });

        await this.employeeRepository.create(employee);

        const notify = Notification.create({
          userId: storeNameExisting.creatorId,
          title: `New notification from user ${user.name}`,
          content: 'i would like work with you',
          status: 'unviewed',
          createdAt: new Date(),
        });
        await this.notifyRepository.create(notify);
      } else {
        return left(new ResponseStoreError());
      }
    }

    if (user.typeUser === 'user') {
      const store = await this.storeRepository.findByUserId(user.id.toString());

      if (store !== null) {
        const time = await this.timeRepository.findManyByStoreId(
          store.id.toString(),
        );

        if (time != null) {
          await this.timeRepository.deleteManyByStoreId(
            time.map((item) => item.storeId),
          );
        }

        const day = await this.dayRepository.findManyByStoreId(
          store.id.toString(),
        );

        if (day != null) {
          await this.dayRepository.deleteManyByStoreId(
            day.map((item) => item.storeId),
          );
        }

        await this.storeRepository.delete(store.id.toString());
      }

      //search schedules from user
      const schedules = await this.schedulesRepository.findManyByUserId(
        user.id.toString(),
      );

      if (schedules) {
        await this.schedulesRepository.deleteManyById(
          schedules.map((item) => item.id.toString()),
        );
      }

      const employee = await this.employeeRepository.findByUserId(
        user.id.toString(),
      );

      if (employee) {
        await this.employeeRepository.delete(employee.id.toString());
      }

      const employ = await this.employRepository.findByUserId(id);

      if (employ) {
        await this.employRepository.delete(employ.id.toString());
      }
    }
    return right({ user });
  }
}
