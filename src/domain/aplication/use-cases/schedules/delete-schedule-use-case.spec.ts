import { InMemoryScheduleRepository } from '../../../../../test/in-memory-repository/in-memory-schedule-repository';
import { InMemoryStoreRepository } from '../../../../../test/in-memory-repository/in-memory-store-repository';
import { MakeSchedule } from '../../../../../test/factories/make-schedule';
import { DeleteScheduleUseCase } from './delete-schedule-use-case';
import { InMemoryNotificationRepository } from '../../../../../test/in-memory-repository/in-memory-notification-repository';
import { InMemoryUserRepository } from '../../../../../test/in-memory-repository/in-memory-user-repository';
import { MakeStore } from '../../../../../test/factories/make-store';
import { InMemoryEmployRepository } from '../../../../../test/in-memory-repository/in-memory-employ-aproved-repository';
import { MakeEmployAproved } from '../../../../../test/factories/make-employ-aproved';
import { MakeUser } from '../../../../../test/factories/make-user';

let inMemoryScheduleRepository: InMemoryScheduleRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let inMemoryuserRepository: InMemoryUserRepository;
let inMemorystoreRepository: InMemoryStoreRepository;
let inMemoryEmployRepository: InMemoryEmployRepository;
let sut: DeleteScheduleUseCase;

describe('Register schedule', () => {
  beforeEach(() => {
    inMemoryScheduleRepository = new InMemoryScheduleRepository();
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    inMemoryuserRepository = new InMemoryUserRepository();
    inMemorystoreRepository = new InMemoryStoreRepository();
    inMemoryEmployRepository = new InMemoryEmployRepository();
    sut = new DeleteScheduleUseCase(
      inMemoryScheduleRepository,
      inMemoryNotificationRepository,
      inMemorystoreRepository,
      inMemoryEmployRepository,
      inMemoryuserRepository,
    );
  });

  it('should be able delete a schedule', async () => {
    const user = MakeUser({ name: 'john Snow' });
    inMemoryuserRepository.create(user);

    const store = MakeStore({});
    inMemorystoreRepository.create(store);

    const employ = MakeEmployAproved({});
    inMemoryEmployRepository.create(employ);

    const schedule = MakeSchedule({
      storeId: store.id.toString(),
      employId: employ.id.toString(),
      userId: user.id.toString(),
    });

    inMemoryScheduleRepository.create(schedule);

    const result = await sut.execute({
      id: schedule.id.toString(),
      userId: schedule.userId,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryScheduleRepository.items).toHaveLength(0);
  });
});
