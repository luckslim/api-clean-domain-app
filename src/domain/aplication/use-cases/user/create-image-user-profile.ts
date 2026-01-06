import { left, right, type Either } from '@/core/either';
import { fileRepository } from '../../repositories/file-repository';
import { Uploader } from '../../storage/uploader';
import { userRepository } from '../../repositories/user-repository';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { Upload } from '@/domain/enterprise/upload-entity';
import { randomUUID } from 'node:crypto';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { File } from '@/domain/enterprise/file-entity';
import { Inject, Injectable } from '@nestjs/common';

interface UploadImageUserProfileRequest {
  userId: string;
  body: Buffer;
}

type UploadImageUserProfileResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { response: string }
>;
@Injectable()
export class UploadImageUserProfileUseCase {
  constructor(
    @Inject(fileRepository) private fileRepository: fileRepository,
    @Inject(userRepository) private userRepository: userRepository,
    @Inject(Uploader) private uploadStorage: Uploader,
  ) {}
  async execute({
    userId,
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
      body,
    });

    const currentUpload = await this.uploadStorage.upload(upload);

    if (!currentUpload) {
      return left(new ResourceNotFoundError('upload failed'));
    } else {
      const file = File.create({
        fileName: upload.fileName,
        userId: user.id.toString(),
        userName: user.userName,
      });

      await this.fileRepository.create(file);
    }

    return right({ response: 'upload success' });
  }
}
