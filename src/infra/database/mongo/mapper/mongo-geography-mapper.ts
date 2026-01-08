import { Coordinates } from '@/core/entities/coordinates';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Geography } from '@/domain/enterprise/geography-entity';
import { ObjectId } from 'mongoose';

export interface GeographyProps {
  _id: ObjectId;
  storeId: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
}

export class MongoGeographyMapper {
  static toDomain(raw: GeographyProps): Geography {
    return Geography.create(
      {
        storeId: raw.storeId,
        coordinates: Coordinates.create({
          latitude: raw.location.coordinates[1],
          longitude: raw.location.coordinates[0],
        }),
      },
      new UniqueEntityId(),
    );
  }

  static toPersistence(geography: Geography): Omit<GeographyProps, '_id'> {
    return {
      storeId: geography.storeId,
      location: {
        type: 'Point',
        coordinates: [
          geography.coordinates.longitude,
          geography.coordinates.latitude,
        ],
      },
      createdAt: new Date(),
    };
  }
}
