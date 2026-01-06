import type { File } from '@/domain/enterprise/file-entity';

export abstract class fileRepository {
  abstract create(file: File): Promise<File>;
  abstract findById(id: string): Promise<File | null>;
  abstract findByUserId(id: string): Promise<File | null>;
  abstract findUrlByUserId(id: string): Promise<string | null>;
  abstract findByUserName(userName: string): Promise<File | null>;
  abstract delete(id: string): Promise<void>;
}
