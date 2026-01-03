import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Store, type StoreProps } from '@/domain/enterprise/store-entity';
import { PrismaStoreMapper } from '@/infra/database/prisma/mappers/prisma-store-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function MakeStore(override: Partial<StoreProps>, id?: UniqueEntityId) {
  const store = Store.create(
    {
      creatorId: new UniqueEntityId().toString(),
      storeName: faker.word.noun(),
      city: faker.location.city(),
      longitude: faker.number.float(),
      latitude: faker.number.float(),
      createdAt: new Date(),
      ...override,
    },
    id,
  );
  return store;
}
@Injectable()
export class StoreFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaStore(data: Partial<StoreProps>): Promise<Store> {
    const store = MakeStore(data);
    await this.prisma.store.create({
      data: PrismaStoreMapper.toPrisma(store),
    });
    return store;
  }
}
