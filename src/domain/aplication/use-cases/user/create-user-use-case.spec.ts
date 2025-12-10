import { EmailAlreadyExistError } from "@/core/errors/email-already-exist-error";
import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { CreateUserUseCase } from "./create-user-use-case";
import { FakeHash } from "../../../../../test/cryptography/fake-hash";

let inMemoryUserRepository: InMemoryUserRepository;
let hashGenerator: FakeHash;
let sut: CreateUserUseCase;

describe("Register user", () => {
  
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashGenerator = new FakeHash();
    sut = new CreateUserUseCase(inMemoryUserRepository, hashGenerator);
  });

  it("should be able register a user", async () => {
    const { name, email, password, userName } = MakeUser({});
    const result = await sut.execute({
      name,
      userName,
      password,
      email,
    });

    expect(result.isRight).toBeTruthy();
  });

  it("should not be able register a user with email or userName Existing", async () => {
    const user = MakeUser({
      email: "johnSnow@gmail.com",
    });

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      name: user.name,
      userName: "john_02",
      password: "123123",
      email: "johnSnow@gmail.com",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EmailAlreadyExistError);
  });
});
