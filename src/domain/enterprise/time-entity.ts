import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import type { timeTypeProps } from '@/core/types/type-time';

export interface TimeProps {
  storeId: string;
  time: string;
  createdAt: Date;
}

export class Time extends Entity<TimeProps> {
  get time() {
    return this.props.time;
  }
  get storeId() {
    return this.props.storeId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  static create(props: TimeProps, id?: UniqueEntityId) {
    const time = new Time(props, id);
    return time;
  }
}
