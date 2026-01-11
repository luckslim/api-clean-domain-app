import { MakeStore } from '../../../../../test/factories/make-store';
import { InMemoryStoreRepository } from '../../../../../test/in-memory-repository/in-memory-store-repository';
import { MakeUser } from '../../../../../test/factories/make-user';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { GetStoreUseCase } from './get-store-by-id-use-case';

let inMemoryStoreRepository: InMemoryStoreRepository;

let sut: GetStoreUseCase;

describe('get store', () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new GetStoreUseCase(inMemoryStoreRepository);
  });

  it('should be able get a store', async () => {
    const user = MakeUser({
      typeUser: 'creatorStore',
    });

    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    await inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStoreRepository.items).toHaveLength(1);
  });

  it('should not be able get a store whith another creatorId', async () => {
    const user = MakeUser({
      typeUser: 'creatorStore',
    });

    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    await inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: new UniqueEntityId().toString(),
    });

    expect(result.isLeft()).toBe(true);
  });
});
