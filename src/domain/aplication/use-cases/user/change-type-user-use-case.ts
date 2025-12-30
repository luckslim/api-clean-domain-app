import { left, right, type Either } from '@/core/either';
import { User } from '@/domain/enterprise/user-entity';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import type { UserTypeProps } from '@/core/types/type-user';
import { Employee } from '@/domain/enterprise/employee-store-entity';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { ResponseStoreError } from '@/core/errors/response-store-error';
import { Notification } from '@/domain/enterprise/notification-entity';
import { Inject, Injectable } from '@nestjs/common';
import { userRepository } from '../../repositories/user-repository';
import { employeeRepository } from '../../repositories/employee-repository';
import { storeRepository } from '../../repositories/store-repository';
import { NotificationRepository } from '../../repositories/notification-repository';
import { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import { scheduleRepository } from '../../repositories/schedule-repository';
import { timeRepository } from '../../repositories/time-repository';
import { dayRepository } from '../../repositories/day-repository';

interface ChangeTypeUserRequest {
  id: string; //id from user
  typeUser: UserTypeProps;
  storeName?: string;
}

type ChangeTypeUserResponse = Either<NotAllowedError, { user: User }>;
@Injectable()
export class ChangeTypeUserUseCase {
  constructor(
    @Inject(userRepository)
    private userRepository: userRepository,
    @Inject(employeeRepository)
    private employeeRepository: employeeRepository,
    @Inject(storeRepository)
    private storeRepository: storeRepository,
    @Inject(NotificationRepository)
    private notifyRepository: NotificationRepository,
    @Inject(employAprovedRepository)
    private employRepository: employAprovedRepository,
    @Inject(scheduleRepository)
    private schedulesRepository: scheduleRepository,
    @Inject(timeRepository)
    private timeRepository: timeRepository,
    @Inject(dayRepository)
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
        await this.schedulesRepository.deleteManyByUserId(user.id.toString());
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
          await this.timeRepository.deleteManyByStoreId(store.id.toString());
        }

        const day = await this.dayRepository.findManyByStoreId(
          store.id.toString(),
        );

        if (day != null) {
          await this.dayRepository.deleteManyByStoreId(store.id.toString());
        }

        await this.storeRepository.delete(store.id.toString());
      }

      //search schedules from user
      const schedules = await this.schedulesRepository.findManyByUserId(
        user.id.toString(),
      );

      if (schedules) {
        await this.schedulesRepository.deleteManyByUserId(user.id.toString());
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
          await this.timeRepository.deleteManyByStoreId(store.id.toString());
        }

        const day = await this.dayRepository.findManyByStoreId(
          store.id.toString(),
        );

        if (day != null) {
          await this.dayRepository.deleteManyByStoreId(store.id.toString());
        }

        await this.storeRepository.delete(store.id.toString());
      }

      //search schedules from user
      const schedules = await this.schedulesRepository.findManyByUserId(
        user.id.toString(),
      );

      if (schedules) {
        await this.schedulesRepository.deleteManyByUserId(user.id.toString());
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

    await this.userRepository.save(user);

    return right({ user });
  }
}
