import { NotificationRepository } from '@/domain/aplication/repositories/notification-repository';
import { Notification } from '@/domain/enterprise/notification-entity';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<Notification> {
    const data = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data,
    });
    return notification;
  }

  async findById(id: string): Promise<Notification | null> {
    const data = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return PrismaNotificationMapper.toDomain(data);
  }

  async getByUserId(id: string): Promise<Notification[] | null> {
    const data = await this.prisma.notification.findMany({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return data.map((item) => PrismaNotificationMapper.toDomain(item));
  }

  async read(notification: Notification): Promise<Notification> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    });

    return notification;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notification.delete({
      where: {
        id,
      },
    });
  }
}
