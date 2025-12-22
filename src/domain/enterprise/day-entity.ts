import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import type { dayTypeProps } from '@/core/types/type-day';

export interface DayProps {
  storeId: string;
  day: dayTypeProps;
  createdAt: Date;
}

export class Day extends Entity<DayProps> {
  get storeId() {
    return this.props.storeId;
  }
  get day() {
    return this.props.day;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  static create(props: DayProps, id?: UniqueEntityId) {
    const day = new Day(props, id);
    return day;
  }
}
