import { left, right, type Either } from '@/core/either';
import type { Employee } from '@/domain/enterprise/employee-store-entity';
import { employeeRepository } from '../../repositories/employee-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { StatusTypeProps } from '@/core/types/type-status';
import { storeRepository } from '../../repositories/store-repository';
import { NotificationRepository } from '../../repositories/notification-repository';
import { Notification } from '@/domain/enterprise/notification-entity';
import { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import { Employ } from '@/domain/enterprise/employ-entity';
import { Inject, Injectable } from '@nestjs/common';

interface DefineTypeStatusEmployRequest {
  id: string; // id from employee
  status: StatusTypeProps;
}

type DefineTypeStatusEmployResponse = Either<
  ResourceNotFoundError,
  { employ: Employee }
>;
@Injectable()
export class DefineTypeStatusEmployUseCase {
  constructor(
    @Inject(employeeRepository) private employRepository: employeeRepository,
    @Inject(storeRepository) private storeRepository: storeRepository,
    @Inject(employAprovedRepository)
    private employAprovedRepository: employAprovedRepository,
    @Inject(NotificationRepository)
    private notifyRepository: NotificationRepository,
  ) {}
  async execute({
    id,
    status,
  }: DefineTypeStatusEmployRequest): Promise<DefineTypeStatusEmployResponse> {
    const employ = await this.employRepository.findById(id);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    const store = await this.storeRepository.findById(employ.storeId);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    if (status === 'aproved') {
      const employAproved = Employ.create({
        storeId: store.id.toString(),
        userId: employ.employeeId,
        disponibility: 'indisponible',
        score: 0,
        createdAt: new Date(),
      });
      await this.employAprovedRepository.create(employAproved);

      const notify = Notification.create({
        userId: employ.employeeId,
        title: `new notification from ${store.storeName}`,
        content: 'You were aproved for work.',
        status: 'unviewed',
        createdAt: new Date(),
      });
      await this.notifyRepository.create(notify);
    }

    if (status === 'reject') {
      const notify = Notification.create({
        userId: employ.employeeId,
        title: `new notification from ${store.storeName}`,
        content: 'You were rejected for work.',
        status: 'unviewed',
        createdAt: new Date(),
      });
      await this.notifyRepository.create(notify);
    }

    employ.status = status;

    await this.employRepository.update(employ);

    return right({ employ });
  }
}
