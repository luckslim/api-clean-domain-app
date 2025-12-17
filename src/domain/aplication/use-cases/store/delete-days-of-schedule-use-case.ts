import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { dayRepository } from "../../repositories/day-repository";

interface DeleteDayStoreRequest {
  id: string; // id from day
}

type DeleteDayStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;

export class DeleteDayStoreUseCase {
  constructor(private dayRepository: dayRepository) {}
  async execute({
    id,
  }: DeleteDayStoreRequest): Promise<DeleteDayStoreResponse> {
    const day = await this.dayRepository.findById(id);

    if (!day) {
      return left(new ResourceNotFoundError());
    }

    await this.dayRepository.delete(id);

    return right({});
  }
}
