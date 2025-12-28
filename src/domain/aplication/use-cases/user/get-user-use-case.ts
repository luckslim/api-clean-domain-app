import { left, right, type Either } from '@/core/either';
import type { WrongCredentialError } from '@/core/errors/wrong-credentials-error';
import { User } from '@/domain/enterprise/user-entity';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { Inject, Injectable } from '@nestjs/common';
import { userRepository } from '../../repositories/user-repository';

interface GetUserRequest {
  id: string;
}

type GetUserResponse = Either<WrongCredentialError, { user: User }>;
@Injectable()
export class GetUserUseCase {
  constructor(@Inject(userRepository) private userRepository: userRepository) {}
  async execute({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(id.toString());

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({ user });
  }
}
