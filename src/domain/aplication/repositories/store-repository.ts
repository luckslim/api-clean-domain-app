import type { Store } from '@/domain/enterprise/store-entity';

export abstract class storeRepository {
  abstract create(store: Store): Promise<Store>;
  abstract findByStoreName(
    storeName: string | undefined,
  ): Promise<Store | null>;
  abstract findById(id: string): Promise<Store | null>;
  abstract findByUserId(id: string): Promise<Store | null>;
  abstract save(store: Store): Promise<Store>;
  abstract delete(id: string): Promise<void>;
}
