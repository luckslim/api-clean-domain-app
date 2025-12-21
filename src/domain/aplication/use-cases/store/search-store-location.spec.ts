import { SearchStoreLocationUseCase } from "./search-store-location";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { MakeUser } from "../../../../../test/factories/make-user";
import { Coordinates } from "@/core/entities/coordinates";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: SearchStoreLocationUseCase;

describe("Register employ", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new SearchStoreLocationUseCase(inMemoryUserRepository);
  });

  it("should be able register a employ", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const userCoordinates = new Coordinates(
      -22.52597137800318, // tere frutas petrópolis
      -43.17204362397092
    );

    const storeCoordinates = new Coordinates(
      -22.52787795303544, // clinica vet petrópolis
      -43.1731004705495
    );

    const result = await sut.execute({
      id: user.id.toString(),
      storeCoordinates,
      userCoordinates,
    });
    
    expect(result.isRight()).toBe(true)
  });
});
