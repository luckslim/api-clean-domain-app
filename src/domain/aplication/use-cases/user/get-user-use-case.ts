import { left, right, type Either } from "@/core/either";
import type { WrongCredentialError } from "@/core/errors/wrong-credentials-error";
import { User } from "@/domain/enterprise/user-entity";
import type { userRepository } from "../repositories/user-repository";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

interface GetUserRequest {
  id: UniqueEntityId;
}

type GetUserResponse = Either<WrongCredentialError, { user: User }>;

export class GetUserUseCase {
  constructor(private userRepository: userRepository) {}
  async execute({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return left(new ResourceNotFoundError());
    }
    return right({ user });
  }
}
