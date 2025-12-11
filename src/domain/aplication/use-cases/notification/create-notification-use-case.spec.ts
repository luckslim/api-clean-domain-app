import { CreateNotificationUseCase } from "./create-notification-use-case";
import { InMemoryNotificationRepository } from "../../../../../test/in-memory-repository/in-memory-notification-repository";
import { InMemoryUserRepository } from "../../../../../test/in-memory-repository/in-memory-user-repository";
import { MakeUser } from "../../../../../test/factories/make-user";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: CreateNotificationUseCase;

describe("Register notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();

    sut = new CreateNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able register a notification", async () => {
    const user = MakeUser({});

    const result = await sut.execute({
      userId: user.id.toString(),
      title: "new Notification",
      content: "new content, this is my content",
      status: "unviewed",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items).toHaveLength(1);
  });
});
