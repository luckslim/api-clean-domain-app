import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { File } from '@/domain/enterprise/file-entity';
import type { Files as PrismaFile } from '@prisma/client';

export class PrismaFileMapper {
  static toDomain(raw: PrismaFile): File {
    return File.create(
      {
        userId: raw.userId,
        fileName: raw.fileName,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(file: File): PrismaFile {
    return {
      id: file.id.toString(),
      userId: file.userId,
      fileName: file.fileName,
      url: 'none',
      CreatedAt: new Date(),
    };
  }
}
