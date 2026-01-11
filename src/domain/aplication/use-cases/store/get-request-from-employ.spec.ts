import { InMemoryEmployeeRepository } from '../../../../../test/in-memory-repository/in-memory-employ-repository';
import { MakeEmploy } from '../../../../../test/factories/make-employ';
import { RequestFromEmployUseCase } from './get-request-from-employ';
import { MakeStore } from '../../../../../test/factories/make-store';
import { InMemoryStoreRepository } from 'test/in-memory-repository/in-memory-store-repository';
import { MakeUser } from 'test/factories/make-user';

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryStoreRepository: InMemoryStoreRepository;

let sut: RequestFromEmployUseCase;

describe('get requests employee', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new RequestFromEmployUseCase(
      inMemoryEmployeeRepository,
      inMemoryStoreRepository,
    );
  });

  it('should be able get request employee', async () => {
    const user = MakeUser({});
    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    inMemoryStoreRepository.items.push(store);

    for (let i = 0; i < 10; i++) {
      const employ = MakeEmploy({
        storeId: store.id.toString(),
      });
      await inMemoryEmployeeRepository.create(employ);
    }

    const result = await sut.execute({
      id: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
  });
});
