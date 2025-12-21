import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import type { DisponibilityTypeProps } from '@/core/types/type-disponibility';

export interface EmployProps {
  storeId: string | undefined;
  userId: string | undefined;
  disponibility: DisponibilityTypeProps;
  score: number;
  createdAt: Date;
}

export class Employ extends Entity<EmployProps> {
  get storeId() {
    return this.props.storeId;
  }
  get userId() {
    return this.props.userId;
  }
  get disponibility() {
    return this.props.disponibility;
  }
  get score() {
    return this.props.score;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  set disponibility(disponibility: DisponibilityTypeProps) {
    this.props.disponibility = disponibility;
  }
  set score(score: number) {
    this.props.score = score;
  }
  static create(props: EmployProps, id?: UniqueEntityId) {
    const employ = new Employ(props, id);
    return employ;
  }
}
