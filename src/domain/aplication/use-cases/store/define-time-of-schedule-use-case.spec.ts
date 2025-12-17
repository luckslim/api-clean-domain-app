import { MakeStore } from "../../../../../test/factories/make-store";
import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { InMemoryTimeStoreRepository } from "../../../../../test/in-memory-repository/in-memory-time-repository";
import { DefineTimeStoreUseCase } from "./define-time-of-schedule-use-case";

let inMemoryStoreRepository: InMemoryStoreRepository;
let inMemoryTimeRepository: InMemoryTimeStoreRepository;
let sut: DefineTimeStoreUseCase;

describe("definetime store", () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();
    inMemoryTimeRepository = new InMemoryTimeStoreRepository();

    sut = new DefineTimeStoreUseCase(
      inMemoryStoreRepository,
      inMemoryTimeRepository
    );
  });

  it("should be able define time of schedule from store", async () => {
    const user = MakeUser({});
    const store = MakeStore({ creatorId: user.id.toString() });
    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: user.id.toString(),
      time: "10:00",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryTimeRepository.items[0]?.time).toEqual("10:00");
  });
});
