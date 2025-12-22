import { left, right, type Either } from '@/core/either';
import type { WrongCredentialError } from '@/core/errors/wrong-credentials-error';
import type { fileRepository } from '../../repositories/file-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface GetImageUserProfileRequest {
  userId: string;
}

type GetImageUserProfileResponse = Either<
  WrongCredentialError,
  { url: string }
>;

export class GetImageUserProfileUseCase {
  constructor(private fileRepository: fileRepository) {}
  async execute({
    userId,
  }: GetImageUserProfileRequest): Promise<GetImageUserProfileResponse> {
    const url = await this.fileRepository.findUrlByUserId(userId);
    if (!url) {
      return left(new ResourceNotFoundError());
    }
    return right({ url });
  }
}
