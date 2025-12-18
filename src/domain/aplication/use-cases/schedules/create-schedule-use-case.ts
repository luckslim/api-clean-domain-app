import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { Schedule } from "@/domain/enterprise/schedules-entity";
import type { storeRepository } from "../../repositories/store-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { employAprovedRepository } from "../../repositories/employ-aproved-repository";
import type { timeRepository } from "../../repositories/time-repository";
import { TimeListedError } from "@/core/errors/time-listed-error";
import type { dayRepository } from "../../repositories/day-repository";
import { DayListedError } from "@/core/errors/day-listed-error";
import type { scheduleRepository } from "../../repositories/schedule-repository";
import type { NotificationRepository } from "../../repositories/notification-repository";
import { Notification } from "@/domain/enterprise/notification-entity";
import type { userRepository } from "../../repositories/user-repository";

interface CreateScheduleRequest {
  storeId: string;
  employId: string;
  userId: string;
  service: string;
  payment: string;
  price: number;
  time: string;
  date: string;
}
type CreateScheduleResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;

export class CreateScheduleUseCase {
  constructor(
    private storeRepository: storeRepository,
    private employRepository: employAprovedRepository,
    private timeRepository: timeRepository,
    private dayRepository: dayRepository,
    private scheduleRepository: scheduleRepository,
    private notification: NotificationRepository,
    private userRepositoty: userRepository
  ) {}
  async execute({
    storeId,
    employId,
    userId,
    service,
    payment,
    price,
    time,
    date,
  }: CreateScheduleRequest): Promise<CreateScheduleResponse> {
    const store = await this.storeRepository.findById(storeId);

    if (!store) {
      return left(new ResourceNotFoundError());
    }

    const employ = await this.employRepository.findById(employId);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    if (employ.storeId != store.id.toString()) {
      return left(new NotAllowedError());
    }

    const timeConfig = await this.timeRepository.findManyById(storeId);

    if (!timeConfig) {
      return left(new TimeListedError());
    }

    const dayConfig = await this.dayRepository.findManyById(storeId);

    if (!dayConfig) {
      return left(new DayListedError());
    }

    const scheduleExisting = await this.scheduleRepository.findByDate(date);

    const hasSchedule = scheduleExisting?.some(
      (item) =>
        item.date === date && item.time === time && item.employId === employId
    );

    if (hasSchedule) {
      return left(new NotAllowedError("is indisponible to schedule"));
    }
    const schedule = Schedule.create({
      storeId,
      employId,
      userId,
      service,
      typePayment: payment,
      price,
      time,
      date,
    });

    await this.scheduleRepository.create(schedule);

    const user = await this.userRepositoty.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError("you is not authenticated"));
    }

    const notifyStore = Notification.create({
      userId: store.creatorId,
      title: `you have a notification from ${user.name}`,
      content: `${user.name} made a schedule at your store.`,
      status: "unviewed",
      createdAt: new Date(),
    });
    await this.notification.create(notifyStore);


    const notifyEmploy = Notification.create({
      userId: employId,
      title: `you have a notification from ${user.name}`,
      content: `${user.name} made a schedule with you`,
      status: "unviewed",
      createdAt: new Date(),
    });
    await this.notification.create(notifyEmploy);

    return right({});
  }
}
