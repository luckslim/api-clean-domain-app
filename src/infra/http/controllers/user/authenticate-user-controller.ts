import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { AuthenticateUserUseCase } from '@/domain/aplication/use-cases/user/authenticate-use-case';
import { WrongCredentialError } from '@/core/errors/wrong-credentials-error';

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema);
@Controller('/authenticate/account')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUserUseCase) {}
  @Post()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUseCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentialError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { access_token } = result.value;

    return {
      access_token,
    };
  }
}
