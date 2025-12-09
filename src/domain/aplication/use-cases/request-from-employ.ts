import { left, right, type Either } from "@/core/either";
import type { Employee } from "@/domain/enterprise/employee-store-entity";
import type { employeeRepository } from "../repositories/employee-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface RequestFromEmployRequest {
  id: string; // id from store
}

type RequestFromEmployResponse = Either<
  ResourceNotFoundError,
  { employ: Employee[] }
>;

export class RequestFromEmployUseCase {
  constructor(private employRepository: employeeRepository) {}
  async execute({
    id,
  }: RequestFromEmployRequest): Promise<RequestFromEmployResponse> {
    const employ = await this.employRepository.findByStoreId(id);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    return right({ employ });
  }
}
