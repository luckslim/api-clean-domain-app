import { left, right, type Either } from '@/core/either';
import { User } from '@/domain/enterprise/user-entity';

import { NotAllowedError } from '@/core/errors/not-allowed-error';
import type { UserTypeProps } from '@/core/types/type-user';
import { userRepository } from '../../repositories/user-repository';
import { HashGenerator } from '../../cryptography/hash-generator';
import { Inject, Injectable } from '@nestjs/common';

interface EditUserRequest {
  id: string;
  name: string;
  userName: string;
  typeUser: UserTypeProps;
  email: string;
  password: string;
}

type EditUserResponse = Either<NotAllowedError, { user: User }>;
@Injectable()
export class EditUserUseCase {
  constructor(
    @Inject(userRepository) private userRepository: userRepository,
    @Inject(HashGenerator) private hashGenerator: HashGenerator,
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

      await this.userRepository.save(user);

      return right({ user });
    } catch (error) {
      return left(error as Error);
    }
  }
}
