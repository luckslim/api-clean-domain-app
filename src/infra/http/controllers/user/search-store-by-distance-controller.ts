import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { SearchStoreLocationUseCase } from '@/domain/aplication/use-cases/store/search-store-location';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
const searchStoreByDistanceBodyValidation = z.object({
  distance: z.coerce.number().min(1000).max(10000),
  userLatitude: z.coerce.number().min(-90).max(90),
  userLongitude: z.coerce.number().min(-180).max(180),
});

type SearchStoreByDistanceBodyValidation = z.infer<
  typeof searchStoreByDistanceBodyValidation
>;

const bodyValidationPipe = new ZodValidationPipe(
  searchStoreByDistanceBodyValidation,
);

@Controller('/search/store/:distance/:userLatitude/:userLongitude')
@UseGuards(AuthGuard('jwt'))
export class SearchStoreByDistanceProfilerController {
  constructor(public searchStoreUseCase: SearchStoreLocationUseCase) {}
  @Get()
  @HttpCode(200)
  async handle(
    @Param(bodyValidationPipe)
    params: SearchStoreByDistanceBodyValidation,
  ) {
    const { distance, userLatitude, userLongitude } = params;

    const result = await this.searchStoreUseCase.execute({
      distance,
      userLatitude,
      userLongitude,
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

    const { stores } = result.value;

    return stores;
  }
}
