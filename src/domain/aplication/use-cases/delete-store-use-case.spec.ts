import { MakeStore } from "../../../../test/factories/make-store";
import { InMemoryStoreRepository } from "../../../../test/in-memory-repository/in-memory-store.repository";
import { MakeUser } from "../../../../test/factories/make-user";
import { DeleteStoreUseCase } from "./delete-store-use-case";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryStoreRepository: InMemoryStoreRepository;

let sut: DeleteStoreUseCase;

describe("delete store", () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new DeleteStoreUseCase(inMemoryStoreRepository);
  });

  it("should be able delete a store", async () => {
    const user = MakeUser({
      typeUser: "creatorStore",
    });

    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: store.id.toString(),
      creatorId: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
  });
  
  it("should not be able delete a store whith another creatorId", async () => {
    const user = MakeUser({
      typeUser: "creatorStore",
    });

    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: store.id.toString(),
      creatorId: new UniqueEntityId().toString(),
    });

    expect(result.isLeft()).toBe(true);
  });
});
