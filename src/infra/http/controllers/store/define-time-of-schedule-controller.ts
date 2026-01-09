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
import { Time_Type } from '@/core/types/type-time';
import { DefineTimeStoreUseCase } from '@/domain/aplication/use-cases/store/define-time-of-schedule-use-case';

const defineTimeOfScheduleBodyValidation = z.object({
  id: z.string(),
  time: z.enum(Time_Type),
});

type DefineTimeOfScheduleBodyValidation = z.infer<
  typeof defineTimeOfScheduleBodyValidation
>;
const bodyValidationPipe = new ZodValidationPipe(
  defineTimeOfScheduleBodyValidation,
);

@Controller('/define/time')
export class DefineTimeOfScheduleController {
  constructor(public defineTimeOfScheduleUseCase: DefineTimeStoreUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DefineTimeOfScheduleBodyValidation,
  ) {
    const { id, time } = body;

    const result = await this.defineTimeOfScheduleUseCase.execute({
      id,
      time,
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
