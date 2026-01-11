import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { AuthGuard } from '@nestjs/passport';
import { GetStoreUseCase } from '@/domain/aplication/use-cases/store/get-store-by-id-use-case';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

@Controller('/get/store/by/id')
@UseGuards(AuthGuard('jwt'))
export class GetStoreByIdController {
  constructor(public getStoreByIdUseCase: GetStoreUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: TokenPayloadSchema) {
    const result = await this.getStoreByIdUseCase.execute({
      id: user.sub,
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
