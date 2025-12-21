import { MakeUser } from '../../../../../test/factories/make-user';
import { InMemoryEmployRepository } from '../../../../../test/in-memory-repository/in-memory-employ-aproved-repository';
import { GetEmployUseCase } from './get-employ-by-id';
import { InMemoryStoreRepository } from '../../../../../test/in-memory-repository/in-memory-store-repository';
import { MakeEmployAproved } from '../../../../../test/factories/make-employ-aproved';
import { MakeStore } from '../../../../../test/factories/make-store';

let inMemoryEmployRepository: InMemoryEmployRepository;
let inMemoryStoreRepository: InMemoryStoreRepository;
let sut: GetEmployUseCase;

describe('get employ', () => {
  beforeEach(() => {
    inMemoryEmployRepository = new InMemoryEmployRepository();
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new GetEmployUseCase(
      inMemoryEmployRepository,
      inMemoryStoreRepository,
    );
  });

  it('should be able get a employ', async () => {
    const user = MakeUser({});

    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    inMemoryStoreRepository.create(store);

    const employ = MakeEmployAproved({
      storeId: store.id.toString(),
    });

    inMemoryEmployRepository.create(employ);

    const result = await sut.execute({
      id: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryEmployRepository.items).toHaveLength(1);
  });
});
