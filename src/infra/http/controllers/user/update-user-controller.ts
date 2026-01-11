import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import z from 'zod';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { EditUserUseCase } from '@/domain/aplication/use-cases/user/edit-user-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const updateUserBodyValidation = z.object({
  id: z.string(),
  name: z.string(),
  userName: z.string(),
  email: z.email(),
  password: z.string(),
});

type UpdateUserBodyValidation = z.infer<typeof updateUserBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(updateUserBodyValidation);

@Controller('/update/accounts')
export class UpdateUserController {
  constructor(public updateUserUseCase: EditUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: UpdateUserBodyValidation) {
    const { id, name, userName, email, password } = body;

    const result = await this.updateUserUseCase.execute({
      id,
      name,
      userName,
      typeUser: 'user',
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case NotAllowedError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
