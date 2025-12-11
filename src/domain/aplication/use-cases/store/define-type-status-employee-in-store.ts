import { left, right, type Either } from "@/core/either";
import type { Employee } from "@/domain/enterprise/employee-store-entity";
import type { employeeRepository } from "../../repositories/employee-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import type { StatusTypeProps } from "@/core/types/type-status";
import type { CreateEmployUseCase } from "./create-employ-aproved";
import type { CreateNotificationUseCase } from "../notification/create-notification-use-case";
import type { storeRepository } from "../../repositories/store-repository";

interface DefineTypeStatusEmployRequest {
  id: string; // id from employee
  status: StatusTypeProps;
}

type DefineTypeStatusEmployResponse = Either<
  ResourceNotFoundError,
  { employ: Employee }
>;

export class DefineTypeStatusEmployUseCase {
  constructor(
    private employRepository: employeeRepository,
    private storeRepository: storeRepository,
    private createEmployUseCase: CreateEmployUseCase,
    private notificationUseCase: CreateNotificationUseCase
  ) {}
  async execute({
    id,
    status,
  }: DefineTypeStatusEmployRequest): Promise<DefineTypeStatusEmployResponse> {
    const employ = await this.employRepository.findById(id);

    if (!employ) {
      return left(new ResourceNotFoundError());
    }

    const store = await this.storeRepository.findById(employ.storeId);
    
    if (!store) {
      return left(new ResourceNotFoundError());
    }

    employ.status = status;

    if (employ.status === "Aproved") {
      await this.createEmployUseCase.execute({
        storeId: employ.storeId,
        userId: employ.employeeId,
        disponibility: "indisponible",
        score: 0,
      });

      await this.notificationUseCase.execute({
        userId: id,
        title: `New notification from ${store.storeName}`,
        content: "You were aproved for work.",
        status: "unviewed",
      });
    }

    if (employ.status === "Reject") {
      await this.notificationUseCase.execute({
        userId: id,
        title: `New notification from ${store.storeName}`,
        content: "You were rejected for work.",
        status: "unviewed",
      });
    }

    return right({ employ });
  }
}
