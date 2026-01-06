import { InMemoryFileRepository } from '../../../../../test/in-memory-repository/in-memory-file-repository';
import { GetImageUserProfileUseCase } from './get-image-user-profile';
import { MakeFile } from '../../../../../test/factories/make-file';
import { InMemoryUploaderStorage } from 'test/in-memory-storage/in-memory-uploader';
import { MakeUpload } from 'test/factories/make-upload';

let inMemoryFileRepository: InMemoryFileRepository;
let inMemoryUploaderStorage: InMemoryUploaderStorage;
let sut: GetImageUserProfileUseCase;

describe('create file', () => {
  beforeEach(() => {
    inMemoryFileRepository = new InMemoryFileRepository();
    inMemoryUploaderStorage = new InMemoryUploaderStorage();
    sut = new GetImageUserProfileUseCase(
      inMemoryUploaderStorage,
      inMemoryFileRepository,
    );
  });

  it('should be able a get to file', async () => {
    const file = MakeFile({});
    await inMemoryFileRepository.create(file);

    const upload = MakeUpload({ fileName: file.fileName });

    await inMemoryUploaderStorage.upload(upload);

    const result = await sut.execute({
      userName: file.userName,
    });
    expect(result.isRight()).toBe(true);
  });
});
