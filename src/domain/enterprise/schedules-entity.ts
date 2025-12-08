import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Optional } from "@/core/types/optional";
import type { PaymentTypeProps } from "@/core/types/type-payment";

interface ScheduleProps {
  creatorId: UniqueEntityId;
  employeeId: UniqueEntityId;
  service: string;
  typePayment: PaymentTypeProps;
  price: number;
  time: string;
  date: string;
  createdAt: Date;
  modifiedAt: Date | boolean;
}

export class Schedule extends Entity<ScheduleProps> {
  get creatorId() {
    return this.props.creatorId;
  }
  get employeeId() {
    return this.props.employeeId;
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
  get date() {
    return this.props.date;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get modifiedAt() {
    return this.props.modifiedAt;
  }

  set time(time : string) {
    this.props.time = time
  }
  set date(date: string) {
    this.props.date;
  }
  set modifiedAt( modifiedAt : Date | boolean) {
    this.props.modifiedAt = modifiedAt
  }

  static create(
    props: Optional<ScheduleProps, "modifiedAt">,
    id?: UniqueEntityId
  ) {
    const schedule = new Schedule(
      {
        ...props,
        modifiedAt: props.modifiedAt ?? false,
      },
      id
    );
    return schedule;
  }
}
