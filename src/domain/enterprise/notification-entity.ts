import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import type { NotificationTypeProps } from '@/core/types/type-notification';

export interface NotificationProps {
  userId: string;
  title: string;
  content: string;
  status: NotificationTypeProps;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  get userId() {
    return this.props.userId;
  }
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set status(status: NotificationTypeProps) {
    if (!status.trim()) throw new Error('field empty not allowed');
    this.props.status = status;
  }

  static create(props: NotificationProps, id?: UniqueEntityId) {
    const notification = new Notification(props, id);
    return notification;
  }
}
