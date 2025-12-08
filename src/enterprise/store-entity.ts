import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface StoreProps {
  creatorId: UniqueEntityId;
  storeName: string;
  city: string;
  longitude: number;
  latitude: number;
  createdAt: Date;
}

export class Store extends Entity<StoreProps> {
  get creatorId() {
    return this.props.creatorId;
  }

  get storeName() {
    return this.props.storeName;
  }
  get longitude() {
    return this.props.longitude;
  }
  get latitude() {
    return this.props.latitude;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  set storeName(storeName: string) {
    this.props.storeName = storeName;
  }
  set longitude(longitude: number) {
    this.props.longitude = longitude;
  }
  set latitude(latitude: number) {
    this.props.latitude = latitude;
  }

  static create(props: StoreProps, id?: UniqueEntityId) {
    const store = new Store(props, id);
    return store;
  }
}
