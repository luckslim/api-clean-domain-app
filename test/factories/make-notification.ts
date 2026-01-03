import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Notification,
  type NotificationProps,
} from '@/domain/enterprise/notification-entity';
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

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

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaNotification(
    data: Partial<NotificationProps>,
  ): Promise<Notification> {
    const notification = MakeNotification(data);
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
    return notification;
  }
}
