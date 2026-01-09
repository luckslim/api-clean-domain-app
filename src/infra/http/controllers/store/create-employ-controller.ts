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
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { CreateEmployUseCase } from '@/domain/aplication/use-cases/store/create-employ-aproved';
import { Disponibility_Props } from '@/core/types/type-disponibility';

const createEmployBodyValidation = z.object({
  storeId: z.string(),
  userId: z.string(),
  disponibility: z.enum(Disponibility_Props),
  score: z.coerce.number(),
});

type CreateEmployBodyValidation = z.infer<typeof createEmployBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(createEmployBodyValidation);

@Controller('/create/employ')
export class CreateEmployController {
  constructor(public createEmployUseCase: CreateEmployUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateEmployBodyValidation) {
    const { storeId, userId, disponibility, score } = body;

    const result = await this.createEmployUseCase.execute({
      storeId,
      userId,
      disponibility,
      score,
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
