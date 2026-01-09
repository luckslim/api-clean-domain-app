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
import { Disponibility_Props } from '@/core/types/type-disponibility';
import { DefineDisponibilityEmployUseCase } from '@/domain/aplication/use-cases/store/define-disponibility-employ-use-case';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

const defineDisponibilityEmployBodyValidation = z.object({
  id: z.string(),
  disponibility: z.enum(Disponibility_Props),
});

type DefineDisponibilityEmployBodyValidation = z.infer<
  typeof defineDisponibilityEmployBodyValidation
>;
const bodyValidationPipe = new ZodValidationPipe(
  defineDisponibilityEmployBodyValidation,
);

@Controller('/disponibility/employ')
export class DefineDisponibilityEmployController {
  constructor(
    public defineDisponibilityEmployUseCase: DefineDisponibilityEmployUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DefineDisponibilityEmployBodyValidation,
  ) {
    const { id, disponibility } = body;

    const result = await this.defineDisponibilityEmployUseCase.execute({
      id,
      disponibility,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
