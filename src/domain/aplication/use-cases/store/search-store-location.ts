import { left, right, type Either } from '@/core/either';
import { geographyRepository } from '../../repositories/geography-repository';
import { storeRepository } from '../../repositories/store-repository';
import { Store } from '@/domain/enterprise/store-entity';
import { Coordinates } from '@/core/entities/coordinates';
import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface SearchStoreLocationRequest {
  userLongitude: number;
  userLatitude: number;
  distance: number;
}

type SearchStoreLocationResponse = Either<
  ResourceNotFoundError,
  { stores: Store[] }
>;
@Injectable()
export class SearchStoreLocationUseCase {
  constructor(
    @Inject(geographyRepository)
    private geographyRepository: geographyRepository,
    @Inject(storeRepository) private storeRepository: storeRepository,
  ) {}
  async execute({
    userLatitude,
    userLongitude,
    distance,
  }: SearchStoreLocationRequest): Promise<SearchStoreLocationResponse> {
    const coordinates = Coordinates.create({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    const searchStores = await this.geographyRepository.findByDistance(
      coordinates,
      distance,
    );

    if (searchStores.length === 0) {
      return left(new ResourceNotFoundError());
    }

    const storeIds = searchStores.map((item) => item.storeId);

    const store = await this.storeRepository.findManyById(storeIds);

    return right({ stores: store });
  }
}
