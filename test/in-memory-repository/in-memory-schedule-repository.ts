import type { scheduleRepository } from "@/domain/aplication/repositories/schedule-repository";
import type { Schedule } from "@/domain/enterprise/schedules-entity";

export class InMemoryScheduleRepository implements scheduleRepository {
  public items: Schedule[] = [];
  
  async create(schedule: Schedule): Promise<Schedule> {
    this.items.push(schedule);
    return schedule;
  }
  
  findByTime(time: string): Promise<Schedule | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Schedule | null> {
    throw new Error("Method not implemented.");
  }

  async findManyByUserId(id: string): Promise<Schedule[] | null> {
    throw new Error("Method not implemented.");
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

  async save(schedule: Schedule): Promise<Schedule> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
