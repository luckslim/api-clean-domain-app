import { Coordinates } from '@/core/entities/coordinates';
import { geographyRepository } from '@/domain/aplication/repositories/geography-repository';
import { Geography } from '@/domain/enterprise/geography-entity';
import { MongoService } from '../mongo.service';
import { Injectable } from '@nestjs/common';
import {
  GeographyProps,
  MongoGeographyMapper,
} from '../mapper/mongo-geography-mapper';

@Injectable()
export class MongoGeographyRepository implements geographyRepository {
  constructor(public mongo: MongoService) {}

  async create(geo: Geography): Promise<Geography> {
    const collection = this.mongo.getDatabase().collection('geography');

    const document = {
      storeId: geo.storeId,
      location: {
        type: 'Point',
        coordinates: [geo.coordinates.longitude, geo.coordinates.latitude],
      },
      createdAt: new Date(),
    };
    await collection.insertOne(document);

    return geo;
  }

  async findByDistance(
    center: Coordinates,
    maxDistanceInMeters: number,
  ): Promise<Geography[]> {
    const collection = this.mongo
      .getDatabase()
      .collection<GeographyProps>('geography');

    const docs = await collection
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [center.longitude, center.latitude],
            },
            $maxDistance: maxDistanceInMeters,
          },
        },
      })
      .toArray();

    return docs.map(MongoGeographyMapper.toDomain);
  }
}
