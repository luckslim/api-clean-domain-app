import type { employAprovedRepository } from '@/domain/aplication/repositories/employ-aproved-repository';
import type { Employ } from '@/domain/enterprise/employ-entity';

export class InMemoryEmployRepository implements employAprovedRepository {
  public items: Employ[] = [];

  async create(employ: Employ): Promise<Employ> {
    this.items.push(employ);
    return employ;
  }

  async findById(id: string): Promise<Employ | null> {
    const employ = this.items.find((item) => item.id.toString() === id);
    if (!employ) {
      return null;
    }
    return employ;
  }
  async findByUserId(id: string): Promise<Employ | null> {
    const employ = this.items.find((item) => item.userId === id);
    if (!employ) {
      return null;
    }
    return employ;
  }

  async findByStoreId(id: string): Promise<Employ[] | null> {
    const employ = this.items.filter((items) => items.storeId === id);
    if (!employ) {
      return null;
    }
    return employ;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
  async update(employ: Employ): Promise<Employ> {
    const itemIndex = this.items.findIndex((item) => item.id === employ.id);
    this.items[itemIndex] = employ;
    return employ;
  }
}
