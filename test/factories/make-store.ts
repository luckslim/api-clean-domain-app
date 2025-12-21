import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Store, type StoreProps } from '@/domain/enterprise/store-entity';
import { faker } from '@faker-js/faker';

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
