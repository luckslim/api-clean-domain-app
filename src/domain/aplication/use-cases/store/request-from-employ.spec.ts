import { InMemoryEmployeeRepository } from "../../../../../test/in-memory-repository/in-memory-employ-repository";
import { MakeEmploy } from "../../../../../test/factories/make-employ";
import { RequestFromEmployUseCase } from "./request-from-employ";
import { MakeStore } from "../../../../../test/factories/make-store";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;

let sut: RequestFromEmployUseCase;

describe("Define type status employee", () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();

    sut = new RequestFromEmployUseCase(inMemoryEmployeeRepository);
  });

  it("should be able Define type status employee", async () => {
    const store = MakeStore({});

    for (let i = 0; i < 10; i++) {
      const employ = MakeEmploy({
        storeId: store.id.toString(),
      });
      inMemoryEmployeeRepository.create(employ);
    }

    const result = await sut.execute({
      id: store.id.toString(),
    });

    expect(result.isRight()).toBe(true);
  });
});
