import { right, type Either } from '@/core/either';
import type { NotAllowedError } from '@/core/errors/not-allowed-error';
import type { NotificationTypeProps } from '@/core/types/type-notification';
import { Notification } from '@/domain/enterprise/notification-entity';
import type { NotificationRepository } from '../../repositories/notification-repository';

interface CreateNotificationRequest {
  userId: string;
  title: string;
  content: string;
  status: NotificationTypeProps;
}

type CreateNotificationResponse = Either<
  NotAllowedError,
  { notification: Notification }
>;

export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    userId,
    title,
    content,
    status,
  }: CreateNotificationRequest): Promise<CreateNotificationResponse> {
    const notify = Notification.create({
      userId,
      title,
      content,
      status,
      createdAt: new Date(),
    });

    const notification = await this.notificationRepository.create(notify);

    return right({ notification });
  }
}
