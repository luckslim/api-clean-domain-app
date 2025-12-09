import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Store } from "@/domain/enterprise/store-entity";

export interface storeRepository {
  create(store: Store): Promise<Store>;
  findByStoreName(storeName: string): Promise<Store | null>;
  findById(id: string): Promise<Store | null>;
  save(store: Store): Promise<Store>;
  delete(id: string): Promise<void>;
}
