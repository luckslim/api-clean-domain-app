import { left, right, type Either } from '@/core/either';
import type { WrongCredentialError } from '@/core/errors/wrong-credentials-error';
import type { fileRepository } from '../../repositories/file-repository';
import type { Uploader } from '../../storage/uploader';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

interface DeleteImageUserProfileRequest {
  userId: string;
}

type DeleteImageUserProfileResponse = Either<
  WrongCredentialError,
  { response: string }
>;

export class DeleteImageUserProfileUseCase {
  constructor(
    private fileRepository: fileRepository,
    private uploadStorage: Uploader,
  ) {}
  async execute({
    userId,
  }: DeleteImageUserProfileRequest): Promise<DeleteImageUserProfileResponse> {
    const file = await this.fileRepository.findByUserId(userId);

    if (!file) {
      return left(new NotAllowedError('you is not authenticated'));
    }

    this.fileRepository.delete(file.id.toString());

    this.uploadStorage.deleteUpload(file.id.toString());

    return right({ response: 'delete success' });
  }
}
