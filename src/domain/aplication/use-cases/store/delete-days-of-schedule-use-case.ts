import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { dayRepository } from '../../repositories/day-repository';
import { Inject, Injectable } from '@nestjs/common';

interface DeleteDayStoreRequest {
  id: string; // id from day
}

type DeleteDayStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;
@Injectable()
export class DeleteDayStoreUseCase {
  constructor(@Inject(dayRepository) private dayRepository: dayRepository) {}
  async execute({
    id,
  }: DeleteDayStoreRequest): Promise<DeleteDayStoreResponse> {
    const day = await this.dayRepository.findById(id);

    if (!day) {
      return left(new ResourceNotFoundError());
    }

    await this.dayRepository.delete(id);

    return right({});
  }
}
