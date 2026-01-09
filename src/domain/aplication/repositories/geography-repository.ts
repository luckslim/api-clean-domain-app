import { Coordinates } from '@/core/entities/coordinates';
import { Geography } from '@/domain/enterprise/geography-entity';

export abstract class geographyRepository {
  abstract create(geo: Geography): Promise<Geography>;

  abstract findByDistance(
    center: Coordinates,
    maxDistanceInMeters: number,
  ): Promise<Geography[]>;
  abstract delete(storeId: string): Promise<void>;
}
