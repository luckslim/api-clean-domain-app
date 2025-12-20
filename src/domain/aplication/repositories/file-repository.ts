import type { File } from "@/domain/enterprise/file-entity";

export interface fileRepository {
  create(file: File): Promise<File>;
  findById(id: string): Promise<File | null>;
  findByUserId(id: string): Promise<File | null>;
  delete(id: string): Promise<void>;
}
