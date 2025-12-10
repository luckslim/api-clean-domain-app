import { InMemoryEmployeeRepository } from "../../../../../test/in-memory-repository/in-memory-employ-repository";
import { MakeEmploy } from "../../../../../test/factories/make-employ";
import { DefineTypeStatusEmployUseCase } from "./define-type-status-employee-in-store";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;

let sut: DefineTypeStatusEmployUseCase;

describe("Define type status employee", () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();

    sut = new DefineTypeStatusEmployUseCase(inMemoryEmployeeRepository);
  });

  it("should be able Define type status employee", async () => {
    const employ = MakeEmploy({});
    inMemoryEmployeeRepository.create(employ);

    const result = await sut.execute({
      id: employ.id.toString(),
      status: "Aproved",
    });

    expect(result.isRight()).toBe(true);
  });
});
