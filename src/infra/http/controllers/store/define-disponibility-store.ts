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
import { DefineDisponibilityStoreUseCase } from '@/domain/aplication/use-cases/store/define-disponibility-store-use-case';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

const defineDisponibilityStoreBodyValidation = z.object({
  id: z.string(),
  disponibility: z.enum(Disponibility_Props),
});

type DefineDisponibilityStoreBodyValidation = z.infer<
  typeof defineDisponibilityStoreBodyValidation
>;

const bodyValidationPipe = new ZodValidationPipe(
  defineDisponibilityStoreBodyValidation,
);

@Controller('/disponibility/store')
export class DefineDisponibilityStoreController {
  constructor(
    public defineDisponibilityStoreUseCase: DefineDisponibilityStoreUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DefineDisponibilityStoreBodyValidation,
  ) {
    const { id, disponibility } = body;

    const result = await this.defineDisponibilityStoreUseCase.execute({
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
