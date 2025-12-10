import { MakeUser } from "../../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { FakeHash } from "../../../../../test/cryptography/fake-hash";
import { EditUserUseCase } from "./edit-user-use-case";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

let inMemoryUserRepository: InMemoryUserRepository;
let hashGenerator: FakeHash;
let sut: EditUserUseCase;

describe("Edit user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashGenerator = new FakeHash();
    sut = new EditUserUseCase(inMemoryUserRepository, hashGenerator);
  });

  it("should be able edit a user", async () => {
    const user = MakeUser({});

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: user.id.toString(),
      typeUser: 'user',
      name: "john Snow",
      userName: "john_sn",
      password: "123123",
      email: "johnsnow@gmail.com",
    });

    expect(result.isRight).toBeTruthy();
  });

  it("should not be able edit a user with field empty ", async () => {
    const user = MakeUser({});

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: user.id.toString(),
      name: "",
      userName: "",
      typeUser:"user",
      password: "",
      email: "",
    });
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceof(Error)
  });

  it("should not be able edit a user with another id", async () => {
    const user = MakeUser({});

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: new UniqueEntityId().toString(),
      name: "john Snow",
      userName: "john_sn",
      typeUser:'user',
      password: "123123",
      email: "johnsnow@gmail.com",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
