import { InMemoryNotificationRepository } from "../../../../../test/in-memory-repository/in-memory-notification-repository";
import { ReadNotificationUseCase } from "./read-notification-use-case";
import { MakeNotification } from "../../../../../test/factories/make-notification";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe("read notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase(
      inMemoryNotificationRepository
    );
  });

  it("should be able read a notification", async () => {
    const notify = MakeNotification({})

    inMemoryNotificationRepository.create(notify)
    
    const result = await sut.execute({
      id: notify.id.toString(),
      status:'viewed'
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]?.status).toEqual('viewed')
  });
});
