import { left, right, type Either } from '@/core/either';
import type { WrongCredentialError } from '@/core/errors/wrong-credentials-error';
import type { fileRepository } from '../../repositories/file-repository';
import type { Uploader } from '../../storage/uploader';
import type { userRepository } from '../../repositories/user-repository';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { Upload } from '@/domain/enterprise/upload-entity';
import { randomUUID } from 'node:crypto';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { File } from '@/domain/enterprise/file-entity';

interface UploadImageUserProfileRequest {
  userId: string;
  url: string;
  body: Buffer;
}

type UploadImageUserProfileResponse = Either<
  WrongCredentialError,
  { response: string }
>;

export class UploadImageUserProfileUseCase {
  constructor(
    private fileRepository: fileRepository,
    private userRepository: userRepository,
    private uploadStorage: Uploader,
  ) {}
  async execute({
    userId,
    url,
    body,
  }: UploadImageUserProfileRequest): Promise<UploadImageUserProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new NotAllowedError('you is not authenticated'));
    }

    const fileExisting = await this.fileRepository.findByUserId(userId);

    if (fileExisting) {
      return left(new NotAllowedError('file already exist'));
    }

    const randomName = randomUUID();

    const upload = Upload.create({
      userId: user.id.toString(),
      fileName: `${user.name}-${randomName}`,
      url,
      body,
    });

    const currentUpload = await this.uploadStorage.upload(upload);

    if (!currentUpload) {
      return left(new ResourceNotFoundError('upload failed'));
    } else {
      const file = File.create({
        fileName: upload.fileName,
        userId: user.id.toString(),
        url: upload.url,
      });

      await this.fileRepository.create(file);
    }

    return right({ response: 'upload success' });
  }
}
