import { left, right, type Either } from "@/core/either";
import { User } from "@/domain/enterprise/user-entity";
import type { userRepository } from "../repositories/user-repository";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { UserTypeProps } from "@/core/types/type-user";
import type { employeeRepository } from "../repositories/employee-repository";
import { Employee } from "@/domain/enterprise/employee-store-entity";
import type { storeRepository } from "../repositories/store-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface ChangeTypeUserRequest {
  id: string; //id from user
  typeUser: UserTypeProps;
  storeName?: string;
}

type ChangeTypeUserResponse = Either<NotAllowedError, { user: User }>;

export class ChangeTypeUserUseCase {
  constructor(
    private userRepository: userRepository,
    private employeeRepository: employeeRepository,
    private storeRepository: storeRepository
  ) {}
  async execute({
    id,
    typeUser,
    storeName,
  }: ChangeTypeUserRequest): Promise<ChangeTypeUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError());
    }

    try {
      user.typeUser = typeUser;
      if (user.typeUser === "employeeStore") {
        const store = await this.storeRepository.findByStoreName(storeName);

        if (!store) {
          return left(new ResourceNotFoundError());
        }

        const employ = await this.employeeRepository.findById(
          user.id.toString()
        );

        if (!employ) {
          const employee = Employee.create({
            employeeId: user.id.toString(),
            storeId: store?.id.toString(),
            typeUser: "employeeStore",
            status: "pending",
            createdAt: new Date(),
          });

          this.employeeRepository.create(employee);
        } else {
          return left(new Error("please, wait a response from store."));
        }
      }

      if (user.typeUser === "user") {
        const store = await this.storeRepository.findByUserId(id);

        if (store) {
          await this.storeRepository.delete(store.id.toString());
        }

        const employee = await this.employeeRepository.findByUserId(id);

        if (employee) {
          await this.employeeRepository.delete(employee.id.toString());
        }
      }
      return right({ user });
    } catch (error) {
      return left(error as Error);
    }
  }
}
