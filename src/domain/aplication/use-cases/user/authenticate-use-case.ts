import { left, right, type Either } from "@/core/either";
import { WrongCredentialError } from "@/core/errors/wrong-credentials-error";
import type { userRepository } from "../../repositories/user-repository";
import type { HashComparer } from "../../cryptography/hash-comparer";
import type { Encrypter } from "../../cryptography/encryter";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

type AuthenticateUserResponse = Either<
  WrongCredentialError,
  { access_token: string }
>;

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: userRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
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
      user.password
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
