import { InMemoryNotificationRepository } from '../../../../../test/in-memory-repository/in-memory-notification-repository';
import { InMemoryUserRepository } from '../../../../../test/in-memory-repository/in-memory-user-repository';
import { MakeUser } from '../../../../../test/factories/make-user';
import { GetNotificationUseCase } from './get-notification-use-case';
import { MakeNotification } from '../../../../../test/factories/make-notification';

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: GetNotificationUseCase;

describe('get notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new GetNotificationUseCase(inMemoryNotificationRepository);
  });

  it('should be able get a notification', async () => {
    const user = MakeUser({});
    for (let i = 0; i < 10; i++) {
      const notify = MakeNotification({
        userId: user.id.toString(),
      });
      inMemoryNotificationRepository.create(notify);
    }

    const result = await sut.execute({
      id: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
  });
});
