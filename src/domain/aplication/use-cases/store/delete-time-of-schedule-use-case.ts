import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Time } from "@/domain/enterprise/time-entity";
import type { timeRepository } from "../../repositories/time-repository";

interface DeleteTimeStoreRequest {
  id: string; // id from time
}

type DeleteTimeStoreResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;

export class DeleteTimeStoreUseCase {
  constructor(private timeRepository: timeRepository) {}
  async execute({
    id,
  }: DeleteTimeStoreRequest): Promise<DeleteTimeStoreResponse> {
    const time = await this.timeRepository.findById(id);

    if (!time) {
      return left(new ResourceNotFoundError());
    }

    await this.timeRepository.delete(id);

    return right({});
  }
}
