import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { GetUserUseCase } from '@/domain/aplication/use-cases/user/get-user-use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { AuthGuard } from '@nestjs/passport';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

@Controller('/fetch/accounts')
@UseGuards(AuthGuard('jwt'))
export class FetchUserController {
  constructor(public fetchUserUseCase: GetUserUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() userToken: TokenPayloadSchema) {
    const result = await this.fetchUserUseCase.execute({ id: userToken.sub });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case NotAllowedError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    const { user } = result.value;

    return { user };
  }
}
