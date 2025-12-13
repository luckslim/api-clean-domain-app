import { MakeStore } from "../../../../../test/factories/make-store";
import { InMemoryStoreRepository } from "../../../../../test/in-memory-repository/in-memory-store-repository";
import { DefineDisponibilityStoreUseCase } from "./define-disponibility-store-use-case";

let inMemoryStoreRepository : InMemoryStoreRepository;
let sut : DefineDisponibilityStoreUseCase;

describe("definedisponibility store", () => {
  beforeEach(() => {
    inMemoryStoreRepository = new InMemoryStoreRepository();

    sut = new DefineDisponibilityStoreUseCase(inMemoryStoreRepository);
  });

  it("should be able define disponibility a store", async () => {
    const store = MakeStore({});

    inMemoryStoreRepository.create(store);

    const result = await sut.execute({
      id: store.id.toString(),
      disponibility: "disponible",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStoreRepository.items).toHaveLength(1);
    expect(inMemoryStoreRepository.items[0]?.disponibility).toEqual(
      "disponible"
    );
  });
});
