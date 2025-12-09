import type { storeRepository } from "@/domain/aplication/repositories/store-repository";
import type { Store } from "@/domain/enterprise/store-entity";

export class InMemoryStoreRepository implements storeRepository {
  public items: Store[] = [];

  async create(store: Store): Promise<Store> {
    this.items.push(store);
    return store;
  }

  async findByStoreName(storeName: string): Promise<Store | null> {
    const store = this.items.find((item) => item.storeName === storeName);
    if (!store) {
      return null;
    }
    return store;
  }

  async findById(id: string): Promise<Store | null> {
    const store = this.items.find((item) => item.id.toString() === id);
    if (!store) {
      return null;
    }
    return store;
  }

  async save(store: Store): Promise<Store> {
    const itemIndex = this.items.findIndex((item) => item.id === store.id);
    this.items[itemIndex] = store;
    return store;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
