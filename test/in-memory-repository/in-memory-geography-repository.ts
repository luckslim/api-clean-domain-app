import { Coordinates } from '@/core/entities/coordinates';
import { geographyRepository } from '@/domain/aplication/repositories/geography-repository';
import { Geography } from '@/domain/enterprise/geography-entity';

export class InMemoryGeographyRepository implements geographyRepository {
  public items: Geography[] = [];

  async create(geo: Geography): Promise<Geography> {
    this.items.push(geo);
    return geo;
  }
  async findByDistance(
    center: Coordinates,
    maxDistanceInMeters: number,
  ): Promise<Geography[]> {
    throw new Error('Method not implemented.');
  }
  async delete(storeId: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.storeId === storeId);
    this.items.splice(itemIndex, 1);
  }
}
