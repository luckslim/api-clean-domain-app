import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { File, type FileProps } from '@/domain/enterprise/file-entity';
import { faker } from '@faker-js/faker';

export function MakeFile(override: Partial<FileProps>, id?: UniqueEntityId) {
  const file = File.create(
    {
      fileName: faker.string.alphanumeric(),
      url: faker.internet.domainWord(),
      userId: new UniqueEntityId().toString(),
      ...override,
    },
    id,
  );
  return file;
}
