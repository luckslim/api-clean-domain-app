import { MakeStore } from "../../../../../test/factories/make-store";
import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryDayStoreRepository } from "../../../../../test/in-memory-repository/in-memory-day-store-repository";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { DefineDayStoreUseCase } from "./define-days-of-schedule-use-case";

let inMemoryStoreRepository: InMemoryStoreRepository;
let inMemoryDayRepository: InMemoryDayStoreRepository;
let sut: DefineDayStoreUseCase;

describe("defineday store", () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();
    inMemoryDayRepository = new InMemoryDayStoreRepository();

    sut = new DefineDayStoreUseCase(
      inMemoryStoreRepository,
      inMemoryDayRepository
    );
  });

  it("should be able define day of schedule from store", async () => {
    const user = MakeUser({});
    const store = MakeStore({ creatorId: user.id.toString() });
    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: user.id.toString(),
      day: "sexta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDayRepository.items[0]?.day).toEqual("sexta");
  });
});
