import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { storeRepository } from '../../repositories/store-repository';
import type { dayTypeProps } from '@/core/types/type-day';
import type { dayRepository } from '../../repositories/day-repository';
import { Day } from '@/domain/enterprise/day-entity';

interface DefineDayStoreRequest {
  id: string; // id from user
  day: dayTypeProps;
}

type DefineDayStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { day: Day }
>;

export class DefineDayStoreUseCase {
  constructor(
    private storeRepository: storeRepository,
    private dayRepository: dayRepository,
  ) {}
  async execute({
    id,
    day,
  }: DefineDayStoreRequest): Promise<DefineDayStoreResponse> {
    const store = await this.storeRepository.findByUserId(id);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    const data = Day.create({
      storeId: store.id.toString(),
      day,
      createdAt: new Date(),
    });

    const currentDay = await this.dayRepository.create(data);

    return right({ day: currentDay });
  }
}
