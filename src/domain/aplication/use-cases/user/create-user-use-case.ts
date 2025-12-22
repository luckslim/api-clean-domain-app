import { left, right, type Either } from '@/core/either';
import { User } from '@/domain/enterprise/user-entity';
import { EmailAlreadyExistError } from '@/core/errors/email-already-exist-error';
import { UserNameAlreadyExistError } from '@/core/errors/username-already-exist-error';
import { Inject, Injectable } from '@nestjs/common';
import { userRepository } from '../../repositories/user-repository';
import { HashGenerator } from '../../cryptography/hash-generator';

interface CreateUserRequest {
  name: string;
  userName: string;
  email: string;
  password: string;
}

type CreateUserResponse = Either<
  EmailAlreadyExistError | UserNameAlreadyExistError,
  { user: User }
>;
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(userRepository) public userRepository: userRepository,
    @Inject(HashGenerator) public hashGenerator: HashGenerator,
  ) {}
  async execute({
    name,
    userName,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const emailExisting = await this.userRepository.findByEmail(email);

    if (emailExisting) {
      return left(new EmailAlreadyExistError());
    }

    const userNameExisting = await this.userRepository.findByUserName(userName);

    if (userNameExisting) {
      return left(new UserNameAlreadyExistError());
    }
    const passwordHashed = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      userName,
      typeUser: 'user',
      email,
      password: passwordHashed,
    });

    return right({ user });
  }
}
