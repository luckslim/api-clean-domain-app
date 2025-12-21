import { InMemoryEmployRepository } from '../../../../../test/in-memory-repository/in-memory-employ-aproved-repository';
import { MakeEmployAproved } from '../../../../../test/factories/make-employ-aproved';
import { DefineDisponibilityEmployUseCase } from './define-disponibility-employ-use-case';

let inMemoryEmployRepository: InMemoryEmployRepository;
let sut: DefineDisponibilityEmployUseCase;

describe('define disponibility employ', () => {
  beforeEach(() => {
    inMemoryEmployRepository = new InMemoryEmployRepository();

    sut = new DefineDisponibilityEmployUseCase(inMemoryEmployRepository);
  });

  it('should be able define disponibility a employ', async () => {
    const employ = MakeEmployAproved({});

    inMemoryEmployRepository.create(employ);

    const result = await sut.execute({
      id: employ.id.toString(),
      disponibility: 'disponible',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryEmployRepository.items).toHaveLength(1);
    expect(inMemoryEmployRepository.items[0]?.disponibility).toEqual(
      'disponible',
    );
  });
});
