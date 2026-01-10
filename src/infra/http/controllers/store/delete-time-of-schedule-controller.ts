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
import { DeleteTimeStoreUseCase } from '@/domain/aplication/use-cases/store/delete-time-of-schedule-use-case';

const deleteTimeBodyValidation = z.object({
  id: z.string(),
});

type DeleteTimeBodyValidation = z.infer<typeof deleteTimeBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(deleteTimeBodyValidation);

@Controller('/delete/time')
@UseGuards(AuthGuard('jwt'))
export class DeleteTimeController {
  constructor(public deleteTimeUseCase: DeleteTimeStoreUseCase) {}

  @Post()
  @HttpCode(204)
  async handle(@Body(bodyValidationPipe) body: DeleteTimeBodyValidation) {
    const { id } = body;
    const result = await this.deleteTimeUseCase.execute({
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
