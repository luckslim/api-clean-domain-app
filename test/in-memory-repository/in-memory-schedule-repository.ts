import type { scheduleRepository } from "@/domain/aplication/repositories/schedule-repository";
import type { Schedule } from "@/domain/enterprise/schedules-entity";

export class InMemoryScheduleRepository implements scheduleRepository {
  public items: Schedule[] = [];

  async create(schedule: Schedule): Promise<Schedule> {
    this.items.push(schedule);
    return schedule;
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = this.items.find((item) => item.id.toString() === id);
    if (!schedule) {
      return null;
    }
    return schedule;
  }

  async findManyByUserId(id: string): Promise<Schedule[] | null> {
    const schedule = this.items.filter(
      (items) => items.employId.toString() === id
    );

    if (!schedule) {
      return null;
    }

    return schedule;
  }

  async findManyTimeExistingByStoreId(id: string): Promise<Schedule[] | null> {
    const schedule = this.items.filter(
      (items) => items.storeId.toString() === id
    );

    if (!schedule) {
      return null;
    }

    return schedule;
  }

  async findByDate(date: string): Promise<Schedule[] | null> {
    const schedule = this.items.filter((item) => item.date === date);
    if (!schedule) {
      return null;
    }
    return schedule;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
