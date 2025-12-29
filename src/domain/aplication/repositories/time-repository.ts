import type { Time } from '@/domain/enterprise/time-entity';

export abstract class timeRepository {
  abstract create(time: Time): Promise<Time>;
  abstract findById(id: string): Promise<Time | null>;
  abstract findManyById(id: string): Promise<Time[] | null>;
  abstract findByStoreId(id: string): Promise<Time | null>;
  abstract findManyByStoreId(id: string): Promise<Time[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract deleteManyByStoreId(id: string): Promise<void>;
}
