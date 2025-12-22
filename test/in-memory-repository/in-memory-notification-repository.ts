import type { NotificationRepository } from '@/domain/aplication/repositories/notification-repository';
import type { Notification } from '@/domain/enterprise/notification-entity';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification): Promise<Notification> {
    this.items.push(notification);
    return notification;
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async getByUserId(id: string): Promise<Notification[] | null> {
    const notification = this.items.filter(
      (item) => item.userId.toString() === id,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }
  async read(notification: Notification): Promise<Notification> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    );
    this.items[itemIndex] = notification;
    return notification;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
