import { CreateScheduleUseCase } from "./create-schedule-use-case";
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
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { InMemoryNotificationRepository } from "../../../../../test/in-memory-repository/in-memory-notification-repository";
import { MakeUser } from "../../../../../test/factories/make-user";

let inMemoryStoreRepository: InMemoryStoreRepository;
let inMemoryEmployRepository: InMemoryEmployRepository;
let inMemoryTimeRepository: InMemoryTimeStoreRepository;
let inMemoryDayRepository: InMemoryDayStoreRepository;
let inMemoryScheduleRepository: InMemoryScheduleRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let notificationRepository: InMemoryNotificationRepository;

let sut: CreateScheduleUseCase;

describe("Register schedule", () => {
  beforeEach(() => {
    inMemoryScheduleRepository = new InMemoryScheduleRepository();
    inMemoryStoreRepository = new InMemoryStoreRepository();
    inMemoryEmployRepository = new InMemoryEmployRepository();
    inMemoryTimeRepository = new InMemoryTimeStoreRepository();
    inMemoryDayRepository = new InMemoryDayStoreRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    notificationRepository = new InMemoryNotificationRepository();
    sut = new CreateScheduleUseCase(
      inMemoryStoreRepository,
      inMemoryEmployRepository,
      inMemoryTimeRepository,
      inMemoryDayRepository,
      inMemoryScheduleRepository,
      notificationRepository,
      inMemoryUserRepository
    );
  });

  it("should be able create a schedule", async () => {
    const user = MakeUser({ name: "john Snow" });
    inMemoryUserRepository.create(user);

    const store = MakeStore({});

    inMemoryStoreRepository.create(store);

    const time = MakeTime({ storeId: store.id.toString() });

    const employ = MakeEmployAproved({ storeId: store.id.toString() });

    inMemoryEmployRepository.create(employ);

    const schedule = MakeSchedule({
      employId: employ.id.toString(),
      storeId: store.id.toString(),
      time: "12:00",
      date: "22/08/2025",
    });

    inMemoryScheduleRepository.create(schedule);

    const result = await sut.execute({
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      userId: user.id.toString(),
      service: "tesoura",
      payment: "credit",
      price: 40,
      time: "10:00",
      date: "22/08/2025",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryScheduleRepository.items).toHaveLength(2);
    expect(notificationRepository.items).toHaveLength(2);
  });

  it("should not be able create a schedule already existing", async () => {
    const user = MakeUser({ name: "john Snow" });
    inMemoryUserRepository.create(user);

    const store = MakeStore({});

    inMemoryStoreRepository.create(store);

    const time = MakeTime({ storeId: store.id.toString() });

    const employ = MakeEmployAproved({ storeId: store.id.toString() });

    inMemoryEmployRepository.create(employ);

    const schedule = MakeSchedule({
      employId: employ.id.toString(),
      storeId: store.id.toString(),
      time: "10:00",
      date: "22/08/2025",
    });

    inMemoryScheduleRepository.create(schedule);

    const result = await sut.execute({
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      userId: user.id.toString(),
      service: "tesoura",
      payment: "credit",
      price: 40,
      time: "10:00",
      date: "22/08/2025",
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
