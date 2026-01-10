import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Employ } from '@/domain/enterprise/employ-entity';
import { employAprovedRepository } from '../../repositories/employ-aproved-repository';
import { storeRepository } from '../../repositories/store-repository';
import { Inject, Injectable } from '@nestjs/common';

interface GetEmployRequest {
  id: string; // id from user
}

type GetEmployResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { employ: Employ[] }
>;
@Injectable()
export class GetEmployUseCase {
  constructor(
    @Inject(employAprovedRepository)
    private employRepository: employAprovedRepository,
    @Inject(storeRepository) private storeRepository: storeRepository,
  ) {}
  async execute({ id }: GetEmployRequest): Promise<GetEmployResponse> {
    const store = await this.storeRepository.findByUserId(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    const employ = await this.employRepository.findByStoreId(
      store.id.toString(),
    );

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    return right({ employ: employ });
  }
}
