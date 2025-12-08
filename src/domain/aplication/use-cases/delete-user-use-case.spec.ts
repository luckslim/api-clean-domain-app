import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { MakeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/in-memory-repository/in-memory-user-repository";
import { DeleteUserUseCase } from "./delete-user-use-case";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: DeleteUserUseCase;

describe("delete user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it("should be able delete a user", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);
    const result = await sut.execute({
      id: user.id,
    });
    expect(result.isRight).toBeTruthy();
    expect(inMemoryUserRepository.items).toHaveLength(0);
  });
  it("should not be able delete a user with another id", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);
    const result = await sut.execute({
      id: new UniqueEntityId(),
    });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
