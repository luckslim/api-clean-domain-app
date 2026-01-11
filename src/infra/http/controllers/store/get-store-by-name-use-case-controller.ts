import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import z from 'zod';
import { GetStoreByNameUseCase } from '@/domain/aplication/use-cases/store/get-store-by-name-use-case';

const searchStoreByNameBodyValidation = z.object({
  storeName: z.string(),
});

type SearchStoreByNameBodyValidation = z.infer<
  typeof searchStoreByNameBodyValidation
>;

const ParamValidationPipe = new ZodValidationPipe(
  searchStoreByNameBodyValidation,
);

@Controller('/get/store/by/:storeName')
export class GetStoreByNameController {
  constructor(public getStoreByNameUseCase: GetStoreByNameUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(ParamValidationPipe) param: SearchStoreByNameBodyValidation,
  ) {
    const { storeName } = param;

    const result = await this.getStoreByNameUseCase.execute({
      storeName,
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

    const { store } = result.value;

    return store;
  }
}
