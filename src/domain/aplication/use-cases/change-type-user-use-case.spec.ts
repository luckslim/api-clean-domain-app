import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { MakeStore } from "../../../../test/factories/make-store";
import { MakeUser } from "../../../../test/factories/make-user";
import { InMemoryEmployeeRepository } from "../../../../test/in-memory-repository/in-memory-employ-repository";
import { InMemoryStoreRepository } from "../../../../test/in-memory-repository/in-memory-store-repository";
import { InMemoryUserRepository } from "../../../../test/in-memory-repository/in-memory-user-repository";
import { ChangeTypeUserUseCase } from "./change-type-user-use-case";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { MakeEmploy } from "../../../../test/factories/make-employ";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryStoreRepository: InMemoryStoreRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;

let sut: ChangeTypeUserUseCase;

describe("Edit user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryStoreRepository = new InMemoryStoreRepository();
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();

    sut = new ChangeTypeUserUseCase(
      inMemoryUserRepository,
      inMemoryEmployeeRepository,
      inMemoryStoreRepository
    );
  });

  it("should be able edit type a user to employeeStore and create automaticly employee", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const store = MakeStore({});
    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: "employeeStore",
      storeName: store.storeName,
    });

    expect(inMemoryEmployeeRepository.items).toHaveLength(1);
    expect(result.isRight()).toBe(true);
  });

  it("should be able edit type from user to (user) and delete (store,employ)", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const store = MakeStore({
      creatorId: user.id.toString(),
    });
    inMemoryStoreRepository.create(store);

    const employee = MakeEmploy({
      employeeId: user.id.toString(),
    });
    inMemoryEmployeeRepository.create(employee);

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: "user",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStoreRepository.items).toHaveLength(0);
    expect(inMemoryEmployeeRepository.items).toHaveLength(0);
  });

  it("should not be able edit type from user with another Id", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const store = MakeStore({});
    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: new UniqueEntityId().toString(),
      typeUser: "employeeStore",
      storeName: store.storeName,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able edit type from user to employeeStore and create automaticly employee with a storeName Incorrect", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const store = MakeStore({});
    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: "employeeStore",
      storeName: "name incorrect",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
