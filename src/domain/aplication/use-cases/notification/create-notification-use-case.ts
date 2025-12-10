import { left, right, type Either } from "@/core/either";
import type { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { NotificationTypeProps } from "@/core/types/type-notification";
import { Notification } from "@/domain/enterprise/notification-entity";
import type { NotificationRepository } from "../../repositories/notification-repository";
import type { userRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface CreateNotificationRequest {
  userId: string;
  title: string;
  content: string;
  status: NotificationTypeProps;
}

type CreateNotificationResponse = Either<
  NotAllowedError,
  { notification: Notification }
>;

export class CreateNotificationUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: userRepository
  ) {}
  async execute({
    userId,
    title,
    content,
    status,
  }: CreateNotificationRequest): Promise<CreateNotificationResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }
    
    const notify = Notification.create({
      userId,
      title,
      content,
      status,
      createdAt: new Date(),
    });

    const notification = await this.notificationRepository.create(notify);

    return right({ notification });
  }
}
