import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { storeRepository } from '../../repositories/store-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Store } from '@/domain/enterprise/store-entity';
import { Inject, Injectable } from '@nestjs/common';

interface GetStoreRequest {
  id: string; // id from user
}

type GetStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;
@Injectable()
export class GetStoreUseCase {
  constructor(
    @Inject(storeRepository) private storeRepository: storeRepository,
  ) {}
  async execute({ id }: GetStoreRequest): Promise<GetStoreResponse> {
    const store = await this.storeRepository.findByUserId(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    return right({ store: store });
  }
}
