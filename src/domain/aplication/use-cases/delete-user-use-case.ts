import { left, right, type Either } from "@/core/either";
import { User } from "@/domain/enterprise/user-entity";
import type { userRepository } from "../repositories/user-repository";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

interface DeleteUserRequest {
  id: UniqueEntityId;
}

type DeleteUserResponse = Either<NotAllowedError, { user: User }>;

export class DeleteUserUseCase {
  constructor(
    private userRepository: userRepository,
  ) {}
  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError());
    }

    await this.userRepository.delete(id)
    return right({ user });
  }
}
