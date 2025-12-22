import type { Day } from '@/domain/enterprise/day-entity';

export interface dayRepository {
  create(day: Day): Promise<Day>;
  findById(id: string): Promise<Day | null>;
  findManyById(id: string): Promise<Day[] | null>;
  findManyByStoreId(id: string): Promise<Day[] | null>;
  delete(id: string): Promise<void>;
  deleteManyByStoreId(id: string[]): Promise<void>;
}
