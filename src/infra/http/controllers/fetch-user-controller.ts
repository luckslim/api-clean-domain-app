import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
} from '@nestjs/common';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { GetUserUseCase } from '@/domain/aplication/use-cases/user/get-user-use-case';

const fetchUserBodyValidation = z.object({
  id: z.string(),
});

type FetchUserBodyValidation = z.infer<typeof fetchUserBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(fetchUserBodyValidation);

@Controller('/fetch/accounts')
export class FetchUserController {
  constructor(public fetchUserUseCase: GetUserUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: FetchUserBodyValidation) {
    const { id } = body;

    const result = await this.fetchUserUseCase.execute({ id });

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
