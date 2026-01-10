import { left, right, type Either } from '@/core/either';
import { Store } from '@/domain/enterprise/store-entity';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { storeRepository } from '../../repositories/store-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { Inject, Injectable } from '@nestjs/common';

interface EditStoreRequest {
  creatorId: string;
  storeName: string;
  city: string;
  longitude: number;
  latitude: number;
}

type EditStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { store: Store }
>;
@Injectable()
export class EditStoreUseCase {
  constructor(
    @Inject(storeRepository) private storeRepository: storeRepository,
  ) {}
  async execute({
    creatorId,
    storeName,
    city,
    longitude,
    latitude,
  }: EditStoreRequest): Promise<EditStoreResponse> {
    const store = await this.storeRepository.findByUserId(creatorId);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    if (store.creatorId.toString() !== creatorId) {
      return left(new NotAllowedError());
    }

    store.storeName = storeName;
    store.city = city;
    store.longitude = longitude;
    store.latitude = latitude;

    await this.storeRepository.save(store);

    return right({ store });
  }
}
