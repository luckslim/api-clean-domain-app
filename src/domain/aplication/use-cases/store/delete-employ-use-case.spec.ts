import { InMemoryEmployRepository } from '../../../../../test/in-memory-repository/in-memory-employ-aproved-repository';
import { MakeEmployAproved } from '../../../../../test/factories/make-employ-aproved';
import { DeleteEmployUseCase } from './delete-employ-use-case';
import { InMemoryEmployeeRepository } from '../../../../../test/in-memory-repository/in-memory-employ-repository';
import { MakeEmploy } from '../../../../../test/factories/make-employ';

let inMemoryEmployRepository: InMemoryEmployRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: DeleteEmployUseCase;

describe('delete employ', () => {
  beforeEach(() => {
    inMemoryEmployRepository = new InMemoryEmployRepository();
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();

    sut = new DeleteEmployUseCase(
      inMemoryEmployRepository,
      inMemoryEmployeeRepository,
    );
  });

  it('should be able delete a employ', async () => {
    const employee = MakeEmploy({});
    inMemoryEmployeeRepository.create(employee);

    const employ = MakeEmployAproved({
      userId: employee.employeeId,
    });
    inMemoryEmployRepository.create(employ);

    const result = await sut.execute({
      id: employ.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    expect(inMemoryEmployRepository.items).toHaveLength(0);
    expect(inMemoryEmployeeRepository.items).toHaveLength(0);
  });
});
