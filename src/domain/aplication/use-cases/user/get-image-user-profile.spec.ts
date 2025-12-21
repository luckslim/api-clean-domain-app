import { InMemoryFileRepository } from "../../../../../test/in-memory-repository/in-memory-file-repository";
import { GetImageUserProfileUseCase } from "./get-image-user-profile";
import { MakeFile } from "../../../../../test/factories/make-file";

let inMemoryFileRepository: InMemoryFileRepository;
let sut: GetImageUserProfileUseCase;

describe("create file", () => {
  beforeEach(() => {
    inMemoryFileRepository = new InMemoryFileRepository();
    sut = new GetImageUserProfileUseCase(inMemoryFileRepository);
  });

  it("should not be able a file", async () => {
    const file = MakeFile({});
    inMemoryFileRepository.create(file);

    const result = await sut.execute({
      userId: file.userId,
    });

    expect(result.isRight()).toBe(true);
  });
});
