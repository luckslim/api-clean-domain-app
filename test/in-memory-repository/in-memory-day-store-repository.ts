import type { dayRepository } from "@/domain/aplication/repositories/day-repository";
import type { Day } from "@/domain/enterprise/day-entity";

export class InMemoryDayStoreRepository implements dayRepository {
  public items: Day[] = [];
  async create(day: Day): Promise<Day> {
    this.items.push(day);
    return day;
  }
  async findById(id: string): Promise<Day | null> {
    const day = this.items.find((item) => item.id.toString() === id);
    if (!day) {
      return null;
    }
    return day;
  }
  async findManyById(id: string): Promise<Day[] | null> {
    const day = this.items.filter((item) => item.storeId === id);
    if (!day) {
      return null;
    }
    return day;
  }
  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
