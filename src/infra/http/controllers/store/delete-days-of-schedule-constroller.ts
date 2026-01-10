import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import z from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { AuthGuard } from '@nestjs/passport';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { DeleteDayStoreUseCase } from '@/domain/aplication/use-cases/store/delete-days-of-schedule-use-case';

const deleteDayBodyValidation = z.object({
  id: z.string(),
});

type DeleteDayBodyValidation = z.infer<typeof deleteDayBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(deleteDayBodyValidation);

@Controller('/delete/day')
@UseGuards(AuthGuard('jwt'))
export class DeleteDayController {
  constructor(public deleteDayUseCase: DeleteDayStoreUseCase) {}

  @Post()
  @HttpCode(204)
  async handle(@Body(bodyValidationPipe) body: DeleteDayBodyValidation) {
    const { id } = body;
    const result = await this.deleteDayUseCase.execute({
      id,
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
