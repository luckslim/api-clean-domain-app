import type { Notification } from "@/domain/enterprise/notification-entity";

export interface NotificationRepository {
  create(notification: Notification): Promise<Notification>;
  findById(id: string): Promise<Notification | null>;
  getByUserId(id: string): Promise<Notification[] | null>;
  read(notification: Notification): Promise<Notification>;
  delete(id: string): Promise<void>;
}
