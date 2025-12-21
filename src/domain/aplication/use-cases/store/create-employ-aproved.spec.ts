import { CreateEmployUseCase } from './create-employ-aproved';
import { InMemoryEmployRepository } from '../../../../../test/in-memory-repository/in-memory-employ-aproved-repository';
import { MakeStore } from '../../../../../test/factories/make-store';
import { MakeUser } from '../../../../../test/factories/make-user';

let inMemoryEmployRepository: InMemoryEmployRepository;
let sut: CreateEmployUseCase;

describe('Register employ', () => {
  beforeEach(() => {
    inMemoryEmployRepository = new InMemoryEmployRepository();
    sut = new CreateEmployUseCase(inMemoryEmployRepository);
  });

  it('should be able register a employ', async () => {
    const store = MakeStore({});
    const user = MakeUser({});
    const result = await sut.execute({
      storeId: store.id.toString(),
      userId: user.id.toString(),
      disponibility: 'indisponible',
      score: 0,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryEmployRepository.items).toHaveLength(1);
  });
});
