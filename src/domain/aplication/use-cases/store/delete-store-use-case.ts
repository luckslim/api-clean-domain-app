import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { storeRepository } from '../../repositories/store-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { Inject, Injectable } from '@nestjs/common';
import { geographyRepository } from '../../repositories/geography-repository';

interface DeleteStoreRequest {
  id: string; // id from store
  creatorId: string;
}

type DeleteStoreResponse = Either<NotAllowedError | ResourceNotFoundError, {}>;
@Injectable()
export class DeleteStoreUseCase {
  constructor(
    @Inject(storeRepository) private storeRepository: storeRepository,
    @Inject(geographyRepository)
    private geographyRepository: geographyRepository,
  ) {}
  async execute({
    id,
    creatorId,
  }: DeleteStoreRequest): Promise<DeleteStoreResponse> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      return left(new ResourceNotFoundError());
    }
    if (store.creatorId !== creatorId) {
      return left(new NotAllowedError());
    }
    await this.storeRepository.delete(id);

    await this.geographyRepository.delete(store.id.toString());

    return right({});
  }
}
