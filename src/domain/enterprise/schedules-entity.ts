import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export interface ScheduleProps {
  storeId: string;
  employId: string;
  userId: string;
  service: string;
  typePayment: string;
  price: number;
  time: string;
  date: string;
  createdAt: Date;
  modifiedAt: Date | boolean;
}

export class Schedule extends Entity<ScheduleProps> {
  get storeId() {
    return this.props.storeId;
  }
  get employId() {
    return this.props.employId;
  }
  get userId() {
    return this.props.userId;
  }
  get service() {
    return this.props.service;
  }
  get typePayment() {
    return this.props.typePayment;
  }
  get price() {
    return this.props.price;
  }
  get time() {
    return this.props.time;
  }
  get day() {
    return this.props.date;
  }
  get date() {
    return this.props.date;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get modifiedAt() {
    return this.props.modifiedAt;
  }

  set time(time: string) {
    this.props.time = time;
  }
  set date(date: string) {
    this.props.date = date;
  }
  set modifiedAt(modifiedAt: Date | boolean) {
    this.props.modifiedAt = modifiedAt;
  }

  static create(
    props: Optional<ScheduleProps, 'modifiedAt' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const schedule = new Schedule(
      {
        ...props,
        modifiedAt: props.modifiedAt ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return schedule;
  }
}
