import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { StatusTypeProps } from "@/core/types/type-status";
import type { UserTypeProps } from "@/core/types/type-user";

export interface EmployProps {
  storeId: string;
  employeeId: string | undefined;
  typeUser: UserTypeProps;
  status: StatusTypeProps;
  createdAt: Date;
}

export class Employee extends Entity<EmployProps> {
  get storeId() {
    return this.props.storeId;
  }
  get employeeId() {
    return this.props.employeeId;
  }

  get typeUser() {
    return this.props.typeUser;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set status(status: StatusTypeProps) {
    this.props.status = status;
  }

  static create(props: EmployProps, id?: UniqueEntityId) {
    const employee = new Employee(props, id);
    return employee;
  }
}
