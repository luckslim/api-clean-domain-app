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
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { DeleteStoreUseCase } from '@/domain/aplication/use-cases/store/delete-store-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

const deleteStoreBodyValidation = z.object({
  id: z.string(),
});

type DeleteStoreBodyValidation = z.infer<typeof deleteStoreBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(deleteStoreBodyValidation);

@Controller('/delete/store')
@UseGuards(AuthGuard('jwt'))
export class DeleteStoreController {
  constructor(public deleteStoreUseCase: DeleteStoreUseCase) {}

  @Post()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: DeleteStoreBodyValidation,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { id } = body;

    const result = await this.deleteStoreUseCase.execute({
      id,
      creatorId: user.sub,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case NotAllowedError:
          throw new ConflictException(error.message);
        case ResourceNotFoundError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
