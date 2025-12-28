import type { Notification } from '@/domain/enterprise/notification-entity';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract getByUserId(id: string): Promise<Notification[] | null>;
  abstract read(notification: Notification): Promise<Notification>;
  abstract delete(id: string): Promise<void>;
}
