import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { File, type FileProps } from '@/domain/enterprise/file-entity';
import { PrismaFileMapper } from '@/infra/database/prisma/mappers/prisma-file-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function MakeFile(override: Partial<FileProps>, id?: UniqueEntityId) {
  const file = File.create(
    {
      fileName: `${faker.word.adverb()}-${new UniqueEntityId().toString()}`,
      userId: new UniqueEntityId().toString(),
      ...override,
    },
    id,
  );
  return file;
}
@Injectable()
export class FileFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaFile(data: Partial<FileProps>): Promise<File> {
    const file = MakeFile(data);
    await this.prisma.files.create({
      data: PrismaFileMapper.toPrisma(file),
    });
    return file;
  }
}
