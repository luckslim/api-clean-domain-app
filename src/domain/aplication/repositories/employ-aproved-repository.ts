import { Employ } from '@/domain/enterprise/employ-entity';

export interface employAprovedRepository {
  create(employ: Employ): Promise<Employ>;
  findById(id: string): Promise<Employ | null>;
  findByUserId(id: string): Promise<Employ | null>;
  findByStoreId(id: string | undefined): Promise<Employ[] | null>;
  delete(id: string): Promise<void>;
}
