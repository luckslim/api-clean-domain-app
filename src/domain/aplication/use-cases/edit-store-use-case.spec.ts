import { MakeStore } from "../../../../test/factories/make-store";
import { InMemoryStoreRepository } from "../../../../test/in-memory-repository/in-memory-store.repository";
import { MakeUser } from "../../../../test/factories/make-user";
import { EditStoreUseCase } from "./edit-store-use-case";

let inMemoryStoreRepository: InMemoryStoreRepository;

let sut: EditStoreUseCase;

describe("Edit store", () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new EditStoreUseCase(inMemoryStoreRepository);
  });

  it("should be able edit a store", async () => {
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
      storeName: "new StoreName",
      city: "New storeCity",
      longitude: 1300,
      latitude: 9233,
    });

    expect(result.isRight()).toBe(true);
  });
});
