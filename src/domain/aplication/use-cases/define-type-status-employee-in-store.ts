import { left, right, type Either } from "@/core/either";
import type { Employee } from "@/domain/enterprise/employee-store-entity";
import type { employeeRepository } from "../repositories/employee-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { StatusTypeProps } from "@/core/types/type-status";

interface DefineTypeStatusEmployRequest {
  id: string; // id from employee
  status: StatusTypeProps;
}

type DefineTypeStatusEmployResponse = Either<
  ResourceNotFoundError,
  { employ: Employee }
>;

export class DefineTypeStatusEmployUseCase {
  constructor(private employRepository: employeeRepository) {}
  async execute({
    id,
    status,
  }: DefineTypeStatusEmployRequest): Promise<DefineTypeStatusEmployResponse> {
    const employ = await this.employRepository.findById(id);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    employ.status = status;
    
    return right({ employ });
  }
}
