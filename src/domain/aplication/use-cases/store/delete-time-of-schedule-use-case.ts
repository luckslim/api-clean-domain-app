import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { timeRepository } from '../../repositories/time-repository';
import { Inject, Injectable } from '@nestjs/common';

interface DeleteTimeStoreRequest {
  id: string; // id from time
}

type DeleteTimeStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;
@Injectable()
export class DeleteTimeStoreUseCase {
  constructor(@Inject(timeRepository) private timeRepository: timeRepository) {}
  async execute({
    id,
  }: DeleteTimeStoreRequest): Promise<DeleteTimeStoreResponse> {
    const time = await this.timeRepository.findById(id);

    if (!time) {
      return left(new ResourceNotFoundError());
    }

    await this.timeRepository.delete(id);

    return right({});
  }
}
