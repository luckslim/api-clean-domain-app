import type { timeRepository } from '@/domain/aplication/repositories/time-repository';
import type { Time } from '@/domain/enterprise/time-entity';

export class InMemoryTimeStoreRepository implements timeRepository {
  public items: Time[] = [];
  async create(time: Time): Promise<Time> {
    this.items.push(time);
    return time;
  }

  async findById(id: string): Promise<Time | null> {
    const time = this.items.find((item) => item.id.toString() === id);
    if (!time) {
      return null;
    }
    return time;
  }

  async findManyByStoreId(id: string): Promise<Time[] | null> {
    const time = this.items.filter((item) => item.storeId.toString() === id);

    if (!time) {
      return null;
    }
    return time;
  }

  async findByStoreId(id: string): Promise<Time | null> {
    const time = this.items.find((item) => item.storeId.toString() === id);
    if (!time) {
      return null;
    }
    return time;
  }

  async findManyById(id: string): Promise<Time[] | null> {
    const time = this.items.filter((item) => item.storeId === id);
    if (!time) {
      return null;
    }
    return time;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }

  async deleteManyByStoreId(id: string[]): Promise<void> {
    const newItems = this.items.filter((item) => !id.includes(item.storeId));
    this.items = newItems;
  }
}
