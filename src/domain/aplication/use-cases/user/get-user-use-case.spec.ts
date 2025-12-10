import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { GetUserUseCase } from "./get-user-use-case";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserUseCase;

describe("Edit user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserUseCase(inMemoryUserRepository);
  });

  it("should be able edit a user", async () => {
    const user = MakeUser({});

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: user.id,
    });

    expect(result.isRight).toBeTruthy();
  });
});
