import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { scheduleRepository } from "../../repositories/schedule-repository";

interface DeleteScheduleRequest {
  id: string; //id from schedule
  userId: string;
}
type DeleteScheduleResponse = Either<NotAllowedError, {}>;

export class DeleteScheduleUseCase {
  constructor(private scheduleRepository: scheduleRepository) {}
  async execute({
    id,
    userId,
  }: DeleteScheduleRequest): Promise<DeleteScheduleResponse> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      return left(new ResourceNotFoundError());
    }
    if(schedule.userId != userId){
        return left(new NotAllowedError('you is not are author of this schedule'))
    }
    await this.scheduleRepository.delete(id)
    return right({});
  }
}
