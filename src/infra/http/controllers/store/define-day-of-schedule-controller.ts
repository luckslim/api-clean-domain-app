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
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { DefineDayStoreUseCase } from '@/domain/aplication/use-cases/store/define-days-of-schedule-use-case';
import { Day_Types } from '@/core/types/type-day';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

const defineDayOfScheduleBodyValidation = z.object({
  id: z.string(),
  day: z.enum(Day_Types),
});

type DefineDayOfScheduleBodyValidation = z.infer<
  typeof defineDayOfScheduleBodyValidation
>;
const bodyValidationPipe = new ZodValidationPipe(
  defineDayOfScheduleBodyValidation,
);

@Controller('/define/day')
export class DefineDayOfScheduleController {
  constructor(public defineDayOfScheduleUseCase: DefineDayStoreUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DefineDayOfScheduleBodyValidation,
  ) {
    const { id, day } = body;

    const result = await this.defineDayOfScheduleUseCase.execute({
      id,
      day,
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
