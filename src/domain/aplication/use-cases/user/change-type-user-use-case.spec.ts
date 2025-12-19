import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { MakeStore } from "../../../../../test/factories/make-store";
import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryEmployeeRepository } from "../../../../../test/in-memory-repository/in-memory-employ-repository";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { ChangeTypeUserUseCase } from "./change-type-user-use-case";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { MakeEmploy } from "../../../../../test/factories/make-employ";
import { InMemoryNotificationRepository } from "../../../../../test/in-memory-repository/in-memory-notification-repository";
import { InMemoryEmployRepository } from "../../../../../test/in-memory-repository/in-memory-employ-aproved-repository";
import { MakeEmployAproved } from "../../../../../test/factories/make-employ-aproved";
import { InMemoryScheduleRepository } from "../../../../../test/in-memory-repository/in-memory-schedule-repository";
import { InMemoryTimeStoreRepository } from "../../../../../test/in-memory-repository/in-memory-time-repository";
import { InMemoryDayStoreRepository } from "../../../../../test/in-memory-repository/in-memory-day-store-repository";
import { MakeTime } from "../../../../../test/factories/make-time";
import { MakeDay } from "../../../../../test/factories/make-day";
import { MakeSchedule } from "../../../../../test/factories/make-schedule";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryStoreRepository: InMemoryStoreRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let inMemoryEmployRepository: InMemoryEmployRepository;
let inMemoryschedulesRepository: InMemoryScheduleRepository;
let inMemoryTimeRepository: InMemoryTimeStoreRepository;
let inMemoryDayRepository: InMemoryDayStoreRepository;
let sut: ChangeTypeUserUseCase;

describe("Edit user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryStoreRepository = new InMemoryStoreRepository();
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    inMemoryEmployRepository = new InMemoryEmployRepository();
    inMemoryschedulesRepository = new InMemoryScheduleRepository();
    inMemoryTimeRepository = new InMemoryTimeStoreRepository();
    inMemoryDayRepository = new InMemoryDayStoreRepository();

    sut = new ChangeTypeUserUseCase(
      inMemoryUserRepository,
      inMemoryEmployeeRepository,
      inMemoryStoreRepository,
      inMemoryNotificationRepository,
      inMemoryEmployRepository,
      inMemoryschedulesRepository,
      inMemoryTimeRepository,
      inMemoryDayRepository
    );
  });

  it("should be able edit type a user to employeeStore and create automaticly requestEmployee", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const storeFromUser = MakeStore({
      creatorId: user.id.toString(),
    });
    inMemoryStoreRepository.create(storeFromUser);

    const store = MakeStore({});
    inMemoryStoreRepository.create(store);

    for (let i = 7; i < 20; i++) {
      const time = MakeTime({
        storeId: storeFromUser.id.toString(),
        time: `${i}:00`,
      });
      inMemoryTimeRepository.create(time);

      const day = MakeDay({
        storeId: storeFromUser.id.toString(),
      });
      inMemoryDayRepository.create(day);

      const schedules = MakeSchedule({
        storeId: storeFromUser.id.toString(),
        userId: user.id.toString(),
      });
      inMemoryschedulesRepository.create(schedules);
    }

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: "employeeStore",
      storeName: store.storeName,
    });
    expect(inMemoryTimeRepository.items).toHaveLength(0);
    expect(inMemoryDayRepository.items).toHaveLength(0);
    expect(inMemoryschedulesRepository.items).toHaveLength(0);
    expect(inMemoryStoreRepository.items).toHaveLength(1);
    expect(inMemoryEmployeeRepository.items).toHaveLength(1);
    expect(inMemoryNotificationRepository.items).toHaveLength(1);
    expect(result.isRight()).toBe(true);
  });

  it("should be able edit type of a user to (user) and delete automaticly (store,employ,time,day)", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const storeFromUser = MakeStore({
      creatorId: user.id.toString(),
    });
    inMemoryStoreRepository.create(storeFromUser);

    for (let i = 7; i < 20; i++) {
      const time = MakeTime({
        storeId: storeFromUser.id.toString(),
        time: `${i}:00`,
      });
      inMemoryTimeRepository.create(time);

      const day = MakeDay({
        storeId: storeFromUser.id.toString(),
      });
      inMemoryDayRepository.create(day);

      const schedules = MakeSchedule({
        storeId: storeFromUser.id.toString(),
        userId: user.id.toString(),
      });
      inMemoryschedulesRepository.create(schedules);
    }

    const employee = MakeEmploy({
      storeId: storeFromUser.id.toString(),
      employeeId: user.id.toString(),
    });
    inMemoryEmployeeRepository.create(employee);

    const employ = MakeEmployAproved({
      storeId: storeFromUser.id.toString(),
      userId: user.id.toString(),
    });
    inMemoryEmployRepository.create(employ);

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: "user",
      storeName: storeFromUser.storeName,
    });

    expect(inMemoryEmployRepository.items).toHaveLength(0);
    expect(inMemoryTimeRepository.items).toHaveLength(0);
    expect(inMemoryDayRepository.items).toHaveLength(0);
    expect(inMemoryschedulesRepository.items).toHaveLength(0);
    expect(inMemoryStoreRepository.items).toHaveLength(0);
    expect(inMemoryEmployeeRepository.items).toHaveLength(0);
    expect(inMemoryNotificationRepository.items).toHaveLength(0);
    expect(result.isRight()).toBe(true);
  });
  it("should be able edit type of a user to (creatorStore) and delete automaticly (employ,schedules)", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    for (let i = 7; i < 20; i++) {
      const schedules = MakeSchedule({
        storeId: new UniqueEntityId().toString(),
        userId: user.id.toString(),
      });
      inMemoryschedulesRepository.create(schedules);
    }

    const employee = MakeEmploy({
      storeId: new UniqueEntityId().toString(),
      employeeId: user.id.toString(),
    });
    inMemoryEmployeeRepository.create(employee);

    const employ = MakeEmployAproved({
      storeId: new UniqueEntityId().toString(),
      userId: user.id.toString(),
    });
    inMemoryEmployRepository.create(employ);

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: "user",
      storeName: "store from joe",
    });

    expect(inMemoryEmployRepository.items).toHaveLength(0);
    expect(inMemoryschedulesRepository.items).toHaveLength(0);
    expect(inMemoryEmployeeRepository.items).toHaveLength(0);
    expect(result.isRight()).toBe(true);
  });
});
