import { MakeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/in-memory-repository/in-memory-user-repository";
import { FakeHash } from "../../../../test/cryptography/fake-hash";
import { AuthenticateUserUseCase } from "./authenticate-use-case";
import { FakeEncrypter } from "../../../../test/cryptography/fake-encrypter";

let inMemoryUserRepository: InMemoryUserRepository;
let hashGenerator: FakeHash;
let encrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe("Register user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    encrypter = new FakeEncrypter();
    hashGenerator = new FakeHash();
    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      hashGenerator,
      encrypter
    );
  });

  it("should be able register a user", async () => {
    const user = MakeUser({
        password: await hashGenerator.hash('123123')
    });

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      email: user.email,
      password: '123123',
    });

    expect(result.isRight()).toBe(true);
  });
});
