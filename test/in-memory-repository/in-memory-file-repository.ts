import type { fileRepository } from '@/domain/aplication/repositories/file-repository';
import type { File } from '@/domain/enterprise/file-entity';

export class InMemoryFileRepository implements fileRepository {
  public items: File[] = [];

  async create(file: File): Promise<File> {
    this.items.push(file);
    return file;
  }

  async findById(id: string): Promise<File | null> {
    const file = this.items.find((item) => item.id.toString() === id);
    if (!file) {
      return null;
    }
    return file;
  }

  async findByUserId(id: string): Promise<File | null> {
    const file = this.items.find((item) => item.userId === id);

    if (!file) {
      return null;
    }

    return file;
  }
  async findUrlByUserId(id: string): Promise<string | null> {
    const file = this.items.find((item) => item.userId === id);

    if (!file) {
      return null;
    }

    return file.fileName;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(itemIndex, 1);
  }
}
