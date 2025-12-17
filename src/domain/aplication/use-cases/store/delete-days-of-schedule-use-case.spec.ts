import { MakeDay } from "../../../../../test/factories/make-day";
import { InMemoryDayStoreRepository } from "../../../../../test/in-memory-repository/in-memory-day-store-repository";
import { DeleteDayStoreUseCase } from "./delete-days-of-schedule-use-case";

let inMemoryDayRepository: InMemoryDayStoreRepository;
let sut: DeleteDayStoreUseCase;

describe("delete day store", () => {
  beforeEach(() => {
    inMemoryDayRepository = new InMemoryDayStoreRepository();

    sut = new DeleteDayStoreUseCase(inMemoryDayRepository);
  });

  it("should be able delete day of schedule from store", async () => {
    const day = MakeDay({});
    inMemoryDayRepository.create(day);

    const result = await sut.execute({
      id: day.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDayRepository.items).toHaveLength(0);
  });
});
