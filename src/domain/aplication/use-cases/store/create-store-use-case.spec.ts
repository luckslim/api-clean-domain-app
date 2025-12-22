import { CreateStoreUseCase } from './create-store-use-case';
import { FakeHash } from '../../../../../test/cryptography/fake-hash';
import { MakeStore } from '../../../../../test/factories/make-store';
import { InMemoryStoreRepository } from '../../../../../test/in-memory-repository/in-memory-store-repository';
import { InMemoryUserRepository } from '../../../../../test/in-memory-repository/in-memory-user-repository';
import { MakeUser } from '../../../../../test/factories/make-user';
import { InMemoryEmployRepository } from '../../../../../test/in-memory-repository/in-memory-employ-aproved-repository';

let inMemoryStoreRepository: InMemoryStoreRepository;

let inMemoryUserRepository: InMemoryUserRepository;

let inMemoryEmployRepository: InMemoryEmployRepository;

let hashGenerator: FakeHash;

let sut: CreateStoreUseCase;

describe('Register store', () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();

    inMemoryUserRepository = new InMemoryUserRepository();

    inMemoryEmployRepository = new InMemoryEmployRepository();

    hashGenerator = new FakeHash();
    sut = new CreateStoreUseCase(
      inMemoryUserRepository,
      inMemoryStoreRepository,
      inMemoryEmployRepository,
    );
  });

  it('should be able create a store', async () => {
    const user = MakeUser({
      typeUser: 'creatorStore',
    });

    inMemoryUserRepository.create(user);

    const { storeName, longitude, latitude, city } = MakeStore({});

    const result = await sut.execute({
      creatorId: user.id.toString(),
      storeName,
      city,
      longitude,
      latitude,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryEmployRepository.items).toHaveLength(1);
  });

  it('should not be able create a store with typeUser incorrect', async () => {
    const user = MakeUser({
      typeUser: 'user',
    });

    inMemoryUserRepository.create(user);

    const { storeName, longitude, latitude, city } = MakeStore({});

    const result = await sut.execute({
      creatorId: user.id.toString(),
      storeName,
      city,
      longitude,
      latitude,
    });

    expect(result.isLeft()).toBe(true);
  });

  it('should not be able create a store Existing', async () => {
    const user = MakeUser({
      typeUser: 'creatorStore',
    });

    inMemoryUserRepository.create(user);

    const store = MakeStore({});

    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      creatorId: user.id.toString(),
      storeName: store.storeName,
      city: store.city,
      longitude: store.longitude,
      latitude: store.latitude,
    });

    expect(result.isLeft()).toBe(true);
  });
});
