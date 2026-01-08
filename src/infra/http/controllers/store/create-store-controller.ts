import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateStoreUseCase } from '@/domain/aplication/use-cases/store/create-store-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

const createStoreBodyValidation = z.object({
  creatorId: z.string(),
  storeName: z.string(),
  city: z.string(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

type CreateStoreBodyValidation = z.infer<typeof createStoreBodyValidation>;
const bodyValidationPipe = new ZodValidationPipe(createStoreBodyValidation);

@Controller('/create/store')
export class CreateStoreController {
  constructor(public createStoreUseCase: CreateStoreUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateStoreBodyValidation) {
    const { city, creatorId, latitude, longitude, storeName } = body;

    const result = await this.createStoreUseCase.execute({
      city,
      creatorId,
      latitude,
      longitude,
      storeName,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case NotAllowedError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
