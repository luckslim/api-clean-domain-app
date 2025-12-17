import type { Schedule } from "@/domain/enterprise/schedules-entity";

export interface scheduleRepository {
  create(schedule: Schedule): Promise<Schedule>;
  findById(id: string): Promise<Schedule | null>;
  findManyByUserId(id: string): Promise<Schedule[] | null>;
  findManyTimeExistingByStoreId(id: string): Promise<Schedule[] | null>;
  findByTime(time: string): Promise<Schedule | null>;
  findByDate(date: string): Promise<Schedule[] | null>;
  save(schedule: Schedule): Promise<Schedule>;
  delete(id: string): Promise<void>;
}
