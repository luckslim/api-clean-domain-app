import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import type { userRepository } from '../../repositories/user-repository';
import type { Coordinates } from '@/core/entities/coordinates';
import { DistanceCalculator } from '../../utils/distance-calculator';

interface SearchStoreLocationRequest {
  id: string; //id from user
  userCoordinates: Coordinates;
  storeCoordinates: Coordinates;
}

type SearchStoreLocationResponse = Either<
  NotAllowedError,
  { distance: string }
>;

export class SearchStoreLocationUseCase {
  constructor(private userRepository: userRepository) {}
  async execute({
    id,
    storeCoordinates,
    userCoordinates,
  }: SearchStoreLocationRequest): Promise<SearchStoreLocationResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError('you is not authenticated'));
    }

    const distanceCalculated = DistanceCalculator.calculateInKm(
      storeCoordinates,
      userCoordinates,
    );

    const formatedDistance = distanceCalculated.toFixed(2);

    return right({ distance: formatedDistance });
  }
}
