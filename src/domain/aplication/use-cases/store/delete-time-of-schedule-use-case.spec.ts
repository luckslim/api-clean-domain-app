import { MakeStore } from '../../../../../test/factories/make-store';
import { MakeTime } from '../../../../../test/factories/make-time';
import { MakeUser } from '../../../../../test/factories/make-user';
import { InMemoryStoreRepository } from '../../../../../test/in-memory-repository/in-memory-store-repository';
import { InMemoryTimeStoreRepository } from '../../../../../test/in-memory-repository/in-memory-time-repository';
import { DeleteTimeStoreUseCase } from './delete-time-of-schedule-use-case';

let inMemoryTimeRepository: InMemoryTimeStoreRepository;
let sut: DeleteTimeStoreUseCase;

describe('deletetime store', () => {
  beforeEach(() => {
    inMemoryTimeRepository = new InMemoryTimeStoreRepository();

    sut = new DeleteTimeStoreUseCase(inMemoryTimeRepository);
  });

  it('should be able delete time of schedule from store', async () => {
    const time = MakeTime({});
    inMemoryTimeRepository.create(time);

    const result = await sut.execute({
      id: time.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryTimeRepository.items).toHaveLength(0);
  });
});
