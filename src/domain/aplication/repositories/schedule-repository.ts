import type { Schedule } from "@/domain/enterprise/schedules-entity";

export interface scheduleRepository {
  create(schedule: Schedule): Promise<Schedule>;
  findById(id: string): Promise<Schedule | null>;
  findManyByUserId(id: string): Promise<Schedule[] | null>;
  findManyByEmployId(id: string): Promise<Schedule[] | null>;
  findByUserId(id: string): Promise<Schedule | null>;
  findManyTimeExistingByStoreId(id: string): Promise<Schedule[] | null>;
  findByDate(date: string): Promise<Schedule[] | null>;
  delete(id: string): Promise<void>;
  deleteManyById(id: string[]): Promise<void>;
}
