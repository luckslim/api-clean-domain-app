import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UserNameAlreadyExistError } from '@/core/errors/username-already-exist-error';
import { EmailAlreadyExistError } from '@/core/errors/email-already-exist-error';
import { DeleteUserUseCase } from '@/domain/aplication/use-cases/user/delete-user-use-case';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

const deleteUserBodyValidation = z.object({
  id: z.string(),
});

type DeleteUserBodyValidation = z.infer<typeof deleteUserBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(deleteUserBodyValidation);

@Controller('/delete/accounts')
export class DeleteUserController {
  constructor(public deleteUserUseCase: DeleteUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: DeleteUserBodyValidation) {
    const { id } = body;

    const result = await this.deleteUserUseCase.execute({ id });

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
