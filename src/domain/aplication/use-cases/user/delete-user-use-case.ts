import { left, right, type Either } from '@/core/either';
import { User } from '@/domain/enterprise/user-entity';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { userRepository } from '../../repositories/user-repository';
import { Inject, Injectable } from '@nestjs/common';

interface DeleteUserRequest {
  id: string;
}

type DeleteUserResponse = Either<NotAllowedError, { user: User }>;
@Injectable()
export class DeleteUserUseCase {
  constructor(@Inject(userRepository) private userRepository: userRepository) {}
  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError());
    }

    await this.userRepository.delete(id);
    return right({ user });
  }
}
