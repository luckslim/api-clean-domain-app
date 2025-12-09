import type { Store } from "@/domain/enterprise/store-entity";

export interface storeRepository {
  create(store: Store): Promise<Store>;
  findByStoreName(storeName: string | undefined): Promise<Store | null>;
  findById(id: string): Promise<Store | null>;
  findByUserId(id: string): Promise<Store | null>;
  save(store: Store): Promise<Store>;
  delete(id: string): Promise<void>;
}
