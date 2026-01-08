import { Coordinates } from '@/core/entities/coordinates';
import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface GeographyProps {
  storeId: string;
  coordinates: Coordinates;
}

export class Geography extends Entity<GeographyProps> {
  get storeId() {
    return this.props.storeId;
  }
  get coordinates() {
    return this.props.coordinates;
  }

  static create(props: GeographyProps, id?: UniqueEntityId) {
    const geography = new Geography(props, id);
    return geography;
  }
}
