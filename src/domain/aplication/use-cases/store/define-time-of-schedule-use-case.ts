import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { storeRepository } from '../../repositories/store-repository';
import type { timeTypeProps } from '@/core/types/type-time';
import { Time } from '@/domain/enterprise/time-entity';
import { timeRepository } from '../../repositories/time-repository';
import { Inject, Injectable } from '@nestjs/common';

interface DefineTimeStoreRequest {
  id: string; // id from user
  time: timeTypeProps;
}

type DefineTimeStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { time: Time }
>;
@Injectable()
export class DefineTimeStoreUseCase {
  constructor(
    @Inject(storeRepository) private storeRepository: storeRepository,
    @Inject(timeRepository) private timeRepository: timeRepository,
  ) {}
  async execute({
    id,
    time,
  }: DefineTimeStoreRequest): Promise<DefineTimeStoreResponse> {
    const store = await this.storeRepository.findByUserId(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    const data = Time.create({
      storeId: store.id.toString(),
      time,
      createdAt: new Date(),
    });

    const currentTime = await this.timeRepository.create(data);

    return right({ time: currentTime });
  }
}
