import type { Day } from '@/domain/enterprise/day-entity';

export abstract class dayRepository {
  abstract create(day: Day): Promise<Day>;
  abstract findById(id: string): Promise<Day | null>;
  abstract findManyById(id: string): Promise<Day[] | null>;
  abstract findManyByStoreId(id: string): Promise<Day[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract deleteManyByStoreId(id: string[]): Promise<void>;
}
