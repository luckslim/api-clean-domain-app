import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { storeRepository } from '../../repositories/store-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Store } from '@/domain/enterprise/store-entity';
import { Inject, Injectable } from '@nestjs/common';

interface GetStoreByNameRequest {
  storeName: string;
}

type GetStoreByNameResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;
@Injectable()
export class GetStoreByNameUseCase {
  constructor(
    @Inject(storeRepository) private storeRepository: storeRepository,
  ) {}
  async execute({
    storeName,
  }: GetStoreByNameRequest): Promise<GetStoreByNameResponse> {
    const store = await this.storeRepository.findByStoreName(storeName);
    if (!store) {
      return left(new ResourceNotFoundError());
    }
    return right({ store: store });
  }
}
