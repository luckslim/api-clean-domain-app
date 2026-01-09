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
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { DefineTypeStatusEmployUseCase } from '@/domain/aplication/use-cases/store/define-type-status-employee-in-store';
import { Status_Type } from '@/core/types/type-status';

const defineTypeStatusEmployBodyValidation = z.object({
  id: z.string(),
  status: z.enum(Status_Type),
});

type DefineTypeStatusEmployBodyValidation = z.infer<
  typeof defineTypeStatusEmployBodyValidation
>;
const bodyValidationPipe = new ZodValidationPipe(
  defineTypeStatusEmployBodyValidation,
);

@Controller('/define/type/status')
export class DefineTypeStatusEmployController {
  constructor(
    public defineTypeStatusEmployUseCase: DefineTypeStatusEmployUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DefineTypeStatusEmployBodyValidation,
  ) {
    const { id, status } = body;

    const result = await this.defineTypeStatusEmployUseCase.execute({
      id,
      status,
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
