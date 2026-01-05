import { left, right, type Either } from '@/core/either';
import { fileRepository } from '../../repositories/file-repository';
import { Uploader } from '../../storage/uploader';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { Inject, Injectable } from '@nestjs/common';

interface DeleteImageUserProfileRequest {
  userId: string;
}

type DeleteImageUserProfileResponse = Either<
  NotAllowedError,
  { response: string }
>;
@Injectable()
export class DeleteImageUserProfileUseCase {
  constructor(
    @Inject(fileRepository) private fileRepository: fileRepository,
    @Inject(Uploader) private uploadStorage: Uploader,
  ) {}
  async execute({
    userId,
  }: DeleteImageUserProfileRequest): Promise<DeleteImageUserProfileResponse> {
    const file = await this.fileRepository.findByUserId(userId);

    if (!file) {
      return left(new NotAllowedError('you is not authenticated'));
    }

    await this.fileRepository.delete(file.id.toString());

    await this.uploadStorage.deleteUpload(file.fileName);

    return right({ response: 'delete success' });
  }
}
