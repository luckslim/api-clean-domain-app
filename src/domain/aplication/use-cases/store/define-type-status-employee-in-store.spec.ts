import { InMemoryEmployeeRepository } from "../../../../../test/in-memory-repository/in-memory-employ-repository";
import { MakeEmploy } from "../../../../../test/factories/make-employ";
import { DefineTypeStatusEmployUseCase } from "./define-type-status-employee-in-store";
import { CreateEmployUseCase } from "./create-employ-aproved";
import { InMemoryEmployRepository } from "../../../../../test/in-memory-repository/in-memory-employ-aproved-repository";
import { CreateNotificationUseCase } from "../notification/create-notification-use-case";
import { InMemoryNotificationRepository } from "../../../../../test/in-memory-repository/in-memory-notification-repository";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { MakeStore } from "../../../../../test/factories/make-store";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryEmployRepository: InMemoryEmployRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let inMemoryStoreRepository: InMemoryStoreRepository;
let createEmployUseCase: CreateEmployUseCase;
let notificationUseCase: CreateNotificationUseCase;
let sut: DefineTypeStatusEmployUseCase;

describe("Define type status employee", () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();

    inMemoryEmployRepository = new InMemoryEmployRepository();

    inMemoryNotificationRepository = new InMemoryNotificationRepository();

    inMemoryStoreRepository = new InMemoryStoreRepository();

    notificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationRepository
    );

    createEmployUseCase = new CreateEmployUseCase(inMemoryEmployRepository);

    sut = new DefineTypeStatusEmployUseCase(
      inMemoryEmployeeRepository,
      inMemoryStoreRepository,
      createEmployUseCase,
      notificationUseCase
    );
  });

  it("should be able Define type status employee and create new Employ Aproved", async () => {
    const store = MakeStore({});
    inMemoryStoreRepository.create(store);

    const employ = MakeEmploy({
      storeId: store.id.toString(),
    });

    inMemoryEmployeeRepository.create(employ);

    const result = await sut.execute({
      id: employ.id.toString(),
      status: "Aproved",
    });

    expect(inMemoryNotificationRepository.items).toHaveLength(1);
    expect(inMemoryEmployRepository.items).toHaveLength(1);
    expect(result.isRight()).toBe(true);
  });

  it("should be able Define type status as Reject and send notification to user", async () => {
    const store = MakeStore({});
    inMemoryStoreRepository.create(store);

    const employ = MakeEmploy({
      storeId: store.id.toString(),
    });

    inMemoryEmployeeRepository.create(employ);

    const result = await sut.execute({
      id: employ.id.toString(),
      status: "Reject",
    });
    
    expect(inMemoryNotificationRepository.items).toHaveLength(1);
    expect(result.isRight()).toBe(true);
  });
});
