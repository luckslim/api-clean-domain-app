import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import z from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { CreateUserUseCase } from '@/domain/aplication/use-cases/user/create-user-use-case';
import { UserNameAlreadyExistError } from '@/core/errors/username-already-exist-error';
import { EmailAlreadyExistError } from '@/core/errors/email-already-exist-error';

const createUserBodyValidation = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.email(),
  password: z.string(),
});

type CreateUserBodyValidation = z.infer<typeof createUserBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(createUserBodyValidation);

@Controller('/accounts')
export class CreateUserController {
  constructor(public createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateUserBodyValidation) {
    const { name, userName, email, password } = body;

    const result = await this.createUserUseCase.execute({
      name,
      userName,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserNameAlreadyExistError:
          throw new ConflictException(error.message);
        case EmailAlreadyExistError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
