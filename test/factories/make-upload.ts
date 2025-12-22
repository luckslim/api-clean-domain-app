import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Upload, type UploadProps } from '@/domain/enterprise/upload-entity';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

export function MakeUpload(
  override: Partial<UploadProps>,
  id?: UniqueEntityId,
) {
  const upload = Upload.create(
    {
      body: Buffer.from(randomUUID()),
      fileName: faker.string.alphanumeric(),
      url: faker.internet.domainWord(),
      userId: new UniqueEntityId().toString(),
      ...override,
    },
    id,
  );
  return upload;
}
