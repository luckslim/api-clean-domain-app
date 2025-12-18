import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { scheduleRepository } from "../../repositories/schedule-repository";
import type { NotificationRepository } from "../../repositories/notification-repository";
import type { userRepository } from "../../repositories/user-repository";
import { Notification } from "@/domain/enterprise/notification-entity";
import type { storeRepository } from "../../repositories/store-repository";
import type { employAprovedRepository } from "../../repositories/employ-aproved-repository";

interface DeleteScheduleRequest {
  id: string; //id from schedule
  userId: string;
}
type DeleteScheduleResponse = Either<NotAllowedError, {}>;

export class DeleteScheduleUseCase {
  constructor(
    private scheduleRepository: scheduleRepository,
    private notification: NotificationRepository,
    private storeRepository: storeRepository,
    private employRepository: employAprovedRepository,
    private userRepositoty: userRepository,
  ) {}
  async execute({
    id,
    userId,
  }: DeleteScheduleRequest): Promise<DeleteScheduleResponse> {
    const user = await this.userRepositoty.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError("you is not authenticated"));
    }
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule) {
      return left(new ResourceNotFoundError());
    }
    if (schedule.userId != userId) {
      return left(
        new NotAllowedError("you is not are author of this schedule")
      );
    }
    await this.scheduleRepository.delete(id);


    const store = await this.storeRepository.findById(schedule.storeId);

    if (!store) {
      return left(new ResourceNotFoundError("store no exist"));
    }

    const notifyStore = Notification.create({
      userId: store.creatorId,
      title: `you have a notification from ${user.name}`,
      content: `${user.name} canceled a schedule at your store.`,
      status: "unviewed",
      createdAt: new Date(),
    });

    await this.notification.create(notifyStore);

    const employ = await this.employRepository.findById(schedule.employId)

    if(!employ){
      return left(new ResourceNotFoundError('emmploy no exist'))
    }

    const notifyEmploy = Notification.create({
      userId: employ.id.toString(),
      title: `you have a notification from ${user.name}`,
      content: `${user.name} canceled a schedule with you`,
      status: "unviewed",
      createdAt: new Date(),
    });

    await this.notification.create(notifyEmploy);

    return right({});
  }
}
