import { InMemoryFileRepository } from '../../../../../test/in-memory-repository/in-memory-file-repository';
import { InMemoryUploaderStorage } from '../../../../../test/in-memory-storage/in-memory-uploader';
import { MakeUser } from '../../../../../test/factories/make-user';
import { DeleteImageUserProfileUseCase } from './delete-image-user-profile';
import { MakeFile } from '../../../../../test/factories/make-file';
import { MakeUpload } from '../../../../../test/factories/make-upload';

let inMemoryFileRepository: InMemoryFileRepository;
let UploaderStorage: InMemoryUploaderStorage;
let sut: DeleteImageUserProfileUseCase;

describe('delete file', () => {
  beforeEach(() => {
    inMemoryFileRepository = new InMemoryFileRepository();
    UploaderStorage = new InMemoryUploaderStorage();
    sut = new DeleteImageUserProfileUseCase(
      inMemoryFileRepository,
      UploaderStorage,
    );
  });

  it('should be able a delete file', async () => {
    const user = MakeUser({});

    const file = MakeFile({ userId: user.id.toString() });
    inMemoryFileRepository.create(file);

    const upload = MakeUpload({ userId: user.id.toString() });
    UploaderStorage.upload(upload);

    const result = await sut.execute({
      userId: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFileRepository.items).toHaveLength(0);
    expect(UploaderStorage.uploads).toHaveLength(0);
  });
});
