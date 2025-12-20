import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { UploadImageUserProfileUseCase } from "./create-image-user-profile";
import { InMemoryFileRepository } from "../../../../../test/in-memory-repository/in-memory-file-repository";
import { InMemoryUploaderStorage } from "../../../../../test/in-memory-storage/in-memory-uploader";
import { MakeUser } from "../../../../../test/factories/make-user";
import { randomUUID } from "node:crypto";
import { MakeFile } from "../../../../../test/factories/make-file";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryFileRepository: InMemoryFileRepository;
let UploaderStorage: InMemoryUploaderStorage;
let sut: UploadImageUserProfileUseCase;

describe("create file", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryFileRepository = new InMemoryFileRepository();
    UploaderStorage = new InMemoryUploaderStorage();
    sut = new UploadImageUserProfileUseCase(
      inMemoryFileRepository,
      inMemoryUserRepository,
      UploaderStorage
    );
  });

  it("should not be able a file", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      userId: user.id.toString(),
      body: Buffer.from("test.png"),
      url: `www.test.com/${randomUUID()}`,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFileRepository.items).toHaveLength(1);
    expect(UploaderStorage.uploads).toHaveLength(1);
  });

  it("should not be able a file", async () => {
    const user = MakeUser({});
    inMemoryUserRepository.create(user);

    const file = MakeFile({ userId: user.id.toString() });
    inMemoryFileRepository.create(file);

    const result = await sut.execute({
      userId: user.id.toString(),
      body: Buffer.from("test.png"),
      url: `www.test.com/${randomUUID()}`,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)

  });
});
