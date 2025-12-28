import type { Schedule } from '@/domain/enterprise/schedules-entity';

export abstract class scheduleRepository {
  abstract create(schedule: Schedule): Promise<Schedule>;
  abstract findById(id: string): Promise<Schedule | null>;
  abstract findManyByUserId(id: string): Promise<Schedule[] | null>;
  abstract findManyByEmployId(id: string): Promise<Schedule[] | null>;
  abstract findByUserId(id: string): Promise<Schedule | null>;
  abstract findManyTimeExistingByStoreId(id: string): Promise<Schedule[] | null>;
  abstract findByDate(date: string): Promise<Schedule[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract deleteManyById(id: string[]): Promise<void>;
}
