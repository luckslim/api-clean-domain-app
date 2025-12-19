import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { scheduleRepository } from "../../repositories/schedule-repository";
import type { userRepository } from "../../repositories/user-repository";
import type { timeRepository } from "../../repositories/time-repository";
import type { Time } from "@/domain/enterprise/time-entity";
import type { employAprovedRepository } from "../../repositories/employ-aproved-repository";

interface GetScheduleDisponibleRequest {
  storeId: string;
  userId: string;
  employId: string;
  date: string;
}
type GetScheduleDisponibleResponse = Either<NotAllowedError, { time: Time[] }>;

export class GetScheduleDisponibleUseCase {
  constructor(
    private userRepository: userRepository,
    private employRepository: employAprovedRepository,
    private scheduleRepository: scheduleRepository,
    private timeRepository: timeRepository
  ) {}
  async execute({
    userId,
    employId,
    date,
    storeId,
  }: GetScheduleDisponibleRequest): Promise<GetScheduleDisponibleResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError("you is not authenticated"));
    }

    const employ = await this.employRepository.findById(employId);

    if (!employ) {
      return left(new ResourceNotFoundError("this employed is not exist"));
    }

    const employExisting =
      (await this.scheduleRepository.findManyByEmployId(employ.id.toString())) ??
      [];

    const dataExisting = employExisting.filter((item) => item.date === date);

    const timeExisting = dataExisting.map((item) => item.time);

    const timeConfig = (await this.timeRepository.findManyById(storeId)) ?? [];

    const timeDisponible = timeConfig.filter(
      (item) => !timeExisting.includes(item.time)
    );
    
    return right({ time: timeDisponible });
  }
}
