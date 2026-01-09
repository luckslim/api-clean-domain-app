import { Employ } from '@/domain/enterprise/employ-entity';

export abstract class employAprovedRepository {
  abstract create(employ: Employ): Promise<Employ>;
  abstract findById(id: string): Promise<Employ | null>;
  abstract findByUserId(id: string): Promise<Employ | null>;
  abstract findByStoreId(id: string | undefined): Promise<Employ[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(employ: Employ): Promise<Employ>;
}
