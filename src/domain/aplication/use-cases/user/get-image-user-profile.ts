import { left, right, type Either } from '@/core/either';
import { fileRepository } from '../../repositories/file-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { Uploader } from '../../storage/uploader';
import { Inject, Injectable } from '@nestjs/common';

interface GetImageUserProfileRequest {
  userName: string;
}

type GetImageUserProfileResponse = Either<
  ResourceNotFoundError,
  { url: string }
>;
@Injectable()
export class GetImageUserProfileUseCase {
  constructor(
    @Inject(Uploader) private uploadRepository: Uploader,
    @Inject(fileRepository) private fileRepository: fileRepository,
  ) {}
  async execute({
    userName,
  }: GetImageUserProfileRequest): Promise<GetImageUserProfileResponse> {
    const file = await this.fileRepository.findByUserName(userName);

    if (!file) {
      return left(new ResourceNotFoundError());
    }

    const urlAmazonS3 = await this.uploadRepository.getSignedImageURL(
      file.fileName,
    );

    if (!urlAmazonS3) {
      return left(new ResourceNotFoundError());
    }

    return right({ url: urlAmazonS3 });
  }
}
