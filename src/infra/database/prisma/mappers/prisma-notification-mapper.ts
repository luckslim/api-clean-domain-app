import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Notification } from '@/domain/enterprise/notification-entity';
import type { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        userId: raw.userId,
        title: raw.title,
        content: raw.content,
        status: raw.status,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(notification: Notification): PrismaNotification {
    return {
      id: notification.id.toString(),
      userId: notification.userId,
      title: notification.title,
      content: notification.content,
      status: notification.status,
      createdAt: notification.createdAt,
    };
  }
}
