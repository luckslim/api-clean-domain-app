import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { Notification } from "@/domain/enterprise/notification-entity";
import type { NotificationRepository } from "../../repositories/notification-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface GetNotificationRequest {
  id: string; //id from user
}

type GetNotificationResponse = Either<
  NotAllowedError,
  { notification: Notification[] }
>;

export class GetNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    id,
  }: GetNotificationRequest): Promise<GetNotificationResponse> {
    const notification = await this.notificationRepository.getByUserId(id)

    if(!notification){
        return left(new ResourceNotFoundError())
    }

    return right({notification})

  }
}
