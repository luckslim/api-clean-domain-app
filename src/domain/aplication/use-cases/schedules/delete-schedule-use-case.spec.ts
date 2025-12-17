import { InMemoryScheduleRepository } from "../../../../../test/in-memory-repository/in-memory-schedule-repository";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { InMemoryEmployRepository } from "../../../../../test/in-memory-repository/in-memory-employ-aproved-repository";
import { InMemoryTimeStoreRepository } from "../../../../../test/in-memory-repository/in-memory-time-repository";
import { InMemoryDayStoreRepository } from "../../../../../test/in-memory-repository/in-memory-day-store-repository";
import { MakeSchedule } from "../../../../../test/factories/make-schedule";
import { MakeStore } from "../../../../../test/factories/make-store";
import { MakeTime } from "../../../../../test/factories/make-time";
import { MakeEmployAproved } from "../../../../../test/factories/make-employ-aproved";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DeleteScheduleUseCase } from "./delete-schedule-use-case";

let inMemoryScheduleRepository: InMemoryScheduleRepository;

let sut: DeleteScheduleUseCase;

describe("Register schedule", () => {
  beforeEach(() => {
    inMemoryScheduleRepository = new InMemoryScheduleRepository();
    sut = new DeleteScheduleUseCase(inMemoryScheduleRepository);
  });

  it("should be able delete a schedule", async () => {
    const schedule = MakeSchedule({});

    inMemoryScheduleRepository.create(schedule);

    const result = await sut.execute({
      id: schedule.id.toString(),
      userId: schedule.userId,
    });
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryScheduleRepository.items).toHaveLength(0)
  });
});
