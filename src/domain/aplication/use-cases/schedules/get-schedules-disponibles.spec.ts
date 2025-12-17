import { MakeSchedule } from "../../../../../test/factories/make-schedule";
import { MakeStore } from "../../../../../test/factories/make-store";
import { MakeTime } from "../../../../../test/factories/make-time";
import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryScheduleRepository } from "../../../../../test/in-memory-repository/in-memory-schedule-repository";
import { InMemoryTimeStoreRepository } from "../../../../../test/in-memory-repository/in-memory-time-repository";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { GetScheduleDisponibleUseCase } from "./get-schedules-disponibles";
import { MakeEmploy } from "../../../../../test/factories/make-employ";
import { InMemoryEmployRepository } from "../../../../../test/in-memory-repository/in-memory-employ-aproved-repository";
import { MakeEmployAproved } from "../../../../../test/factories/make-employ-aproved";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

let inMemoryScheduleRepository: InMemoryScheduleRepository;
let inMemoryUserRepositoy: InMemoryUserRepository;
let inMemoryTimeStoreRepository: InMemoryTimeStoreRepository;
let inMemoryEmployRepository: InMemoryEmployRepository;
let sut: GetScheduleDisponibleUseCase;

describe("Get schedule", () => {
  beforeEach(() => {
    inMemoryScheduleRepository = new InMemoryScheduleRepository();
    inMemoryUserRepositoy = new InMemoryUserRepository();
    inMemoryTimeStoreRepository = new InMemoryTimeStoreRepository();
    inMemoryEmployRepository = new InMemoryEmployRepository();
    sut = new GetScheduleDisponibleUseCase(
      inMemoryUserRepositoy,
      inMemoryEmployRepository,
      inMemoryScheduleRepository,
      inMemoryTimeStoreRepository
    );
  });

  it("should be able get schedules", async () => {
    const employ = MakeEmployAproved({});
    inMemoryEmployRepository.create(employ);

    const user = MakeUser({});
    inMemoryUserRepositoy.create(user);

    const store = MakeStore({});

    for (let i = 7; i < 22; i++) {
      const time = MakeTime({
        storeId: store.id.toString(),
        time: `${i}:00`,
      });

      inMemoryTimeStoreRepository.create(time);
    }

    for (let i = 7; i < 17; i++) {
      const schedule = MakeSchedule({
        storeId: store.id.toString(),
        employId: employ.id.toString(),
        date: "22/09/2025",
        time: `${i}:00`,
      });
      inMemoryScheduleRepository.create(schedule);
    }

    const result = await sut.execute({
      storeId: store.id.toString(),
      userId: user.id.toString(),
      employId: employ.id.toString(),
      date: "22/09/2025",
    });

    expect(result.isRight()).toBe(true);
  });
  it("should not be able get schedules with userId incorrect", async () => {
    const employ = MakeEmployAproved({});
    inMemoryEmployRepository.create(employ);

    const user = MakeUser({});
    inMemoryUserRepositoy.create(user);

    const store = MakeStore({});

    for (let i = 7; i < 22; i++) {
      const time = MakeTime({
        storeId: store.id.toString(),
        time: `${i}:00`,
      });

      inMemoryTimeStoreRepository.create(time);
    }

    for (let i = 7; i < 17; i++) {
      const schedule = MakeSchedule({
        storeId: store.id.toString(),
        employId: employ.id.toString(),
        date: "22/09/2025",
        time: `${i}:00`,
      });
      inMemoryScheduleRepository.create(schedule);
    }

    const result = await sut.execute({
      storeId: store.id.toString(),
      userId: new UniqueEntityId().toString(),
      employId: employ.id.toString(),
      date: "24/09/2025",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  });
});
