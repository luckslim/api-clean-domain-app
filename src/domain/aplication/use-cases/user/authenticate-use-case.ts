import { left, right, type Either } from '@/core/either';
import { WrongCredentialError } from '@/core/errors/wrong-credentials-error';
import { userRepository } from '../../repositories/user-repository';
import { HashComparer } from '../../cryptography/hash-comparer';
import { Encrypter } from '../../cryptography/encryter';
import { Inject, Injectable } from '@nestjs/common';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

type AuthenticateUserResponse = Either<
  WrongCredentialError,
  { access_token: string }
>;
@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject(userRepository) private userRepository: userRepository,
    @Inject(HashComparer) private hashComparer: HashComparer,
    @Inject(Encrypter) private encrypter: Encrypter,
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialError());
    }

    const passwordValid = await this.hashComparer.comparer(
      password,
      user.password,
    );

    if (!passwordValid) {
      return left(new WrongCredentialError());
    }

    const access_token = await this.encrypter.encrypt({
      sub: user.id,
    });

    return right({ access_token });
  }
}
