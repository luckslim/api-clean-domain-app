import { MakeStore } from "../../../../../test/factories/make-store";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { MakeUser } from "../../../../../test/factories/make-user";
import { GetStoreByNameUseCase } from "./get-store-by-name-use-case";

let inMemoryStoreRepository: InMemoryStoreRepository;

let sut: GetStoreByNameUseCase;

describe("get store", () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new GetStoreByNameUseCase(inMemoryStoreRepository);
  });

  it("should be able get a store", async () => {
    const user = MakeUser({
      typeUser: "creatorStore",
    });

    const store = MakeStore({
      creatorId: user.id.toString(),
    });

    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      storeName: store.storeName,
    });

    expect(result.isRight()).toBe(true);
  });
});
