import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Store } from '@/domain/enterprise/store-entity';
import type { Store as PrismaStore } from '@prisma/client';

export class PrismaStoreMapper {
  static toDomain(raw: PrismaStore): Store {
    return Store.create(
      {
        creatorId: raw.creatorId,
        storeName: raw.storeName,
        city: raw.city,
        disponibility: raw.disponibility,
        longitude: raw.longitude,
        latitude: raw.latitude,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(store: Store): PrismaStore {
    return {
      id: store.id.toString(),
      creatorId: store.creatorId,
      storeName: store.storeName,
      city: store.city,
      disponibility: store.disponibility,
      longitude: store.longitude,
      latitude: store.latitude,
      createdAt: store.createdAt,
    };
  }
}
