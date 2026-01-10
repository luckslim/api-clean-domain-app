import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { EditStoreUseCase } from '@/domain/aplication/use-cases/store/edit-store-use-case';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

const editStoreBodyValidation = z.object({
  creatorId: z.string(),
  storeName: z.string(),
  city: z.string(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

type EditStoreBodyValidation = z.infer<typeof editStoreBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(editStoreBodyValidation);

@Controller('/edit/store')
@UseGuards(AuthGuard('jwt'))
export class EditStoreController {
  constructor(public editStoreUseCase: EditStoreUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: EditStoreBodyValidation,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { city, creatorId, latitude, longitude, storeName } = body;

    const result = await this.editStoreUseCase.execute({
      creatorId: user.sub,
      storeName,
      city,
      longitude,
      latitude,
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
