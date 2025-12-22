import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { Notification } from '@/domain/enterprise/notification-entity';
import type { NotificationRepository } from '../../repositories/notification-repository';
import type { NotificationTypeProps } from '@/core/types/type-notification';

interface ReadNotificationRequest {
  id: string; //id from notification
  status: NotificationTypeProps;
}

type ReadNotificationResponse = Either<
  NotAllowedError,
  { notification: Notification }
>;

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    id,
    status,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notify = await this.notificationRepository.findById(id);

    if (!notify) {
      return left(new NotAllowedError());
    }

    notify.status = status;

    const notification = await this.notificationRepository.read(notify);

    return right({ notification });
  }
}
