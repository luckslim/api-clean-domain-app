import { left, right, type Either } from "@/core/either";
import { User } from "@/domain/enterprise/user-entity";
import type { userRepository } from "../repositories/user-repository";
import type { HashGenerator } from "../cryptography/hash-generator";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import type { UserTypeProps } from "@/core/types/type-user";

interface EditUserRequest {
  id: string;
  name: string;
  userName: string;
  typeUser: UserTypeProps;
  email: string;
  password: string;
}

type EditUserResponse = Either<NotAllowedError, { user: User }>;

export class EditUserUseCase {
  constructor(
    private userRepository: userRepository,
    private hashGenerator: HashGenerator
  ) {}
  async execute({
    id,
    name,
    userName,
    typeUser,
    email,
    password,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError());
    }

    try {
      const passwordHashed = await this.hashGenerator.hash(password);

      user.name = name;
      user.userName = userName;
      user.email = email;
      user.typeUser = typeUser;
      user.password = passwordHashed;

      return right({ user });
    } catch (error) {
      return left(error as Error);
    }
  }
}
