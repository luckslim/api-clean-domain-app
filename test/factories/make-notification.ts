import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Notification,
  type NotificationProps,
} from '@/domain/enterprise/notification-entity';
import { faker } from '@faker-js/faker';

export function MakeNotification(
  override: Partial<NotificationProps>,
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      userId: new UniqueEntityId().toString(),
      title: 'new Notification',
      content: faker.lorem.text(),
      status: 'unviewed',
      createdAt: new Date(),
      ...override,
    },
    id,
  );
  return notification;
}
