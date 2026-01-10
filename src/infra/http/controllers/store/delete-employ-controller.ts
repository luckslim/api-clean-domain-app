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
import { DeleteEmployUseCase } from '@/domain/aplication/use-cases/store/delete-employ-use-case';

const deleteEmployBodyValidation = z.object({
  id: z.string(),
});

type DeleteEmployBodyValidation = z.infer<typeof deleteEmployBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(deleteEmployBodyValidation);

@Controller('/delete/employ')
@UseGuards(AuthGuard('jwt'))
export class DeleteEmployController {
  constructor(public deleteEmployUseCase: DeleteEmployUseCase) {}

  @Post()
  @HttpCode(204)
  async handle(@Body(bodyValidationPipe) body: DeleteEmployBodyValidation) {
    const { id } = body;

    const result = await this.deleteEmployUseCase.execute({
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
