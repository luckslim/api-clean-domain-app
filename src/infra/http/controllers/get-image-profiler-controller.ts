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
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { GetImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/get-image-user-profile';

@Controller('/get/image/accounts')
@UseGuards(AuthGuard('jwt'))
export class GetImageProfilerController {
  constructor(public getImageProfilerUseCase: GetImageUserProfileUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() userToken: TokenPayloadSchema) {
    const result = await this.getImageProfilerUseCase.execute({
      userId: userToken.sub,
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
    const { url } = result.value;

    return url;
  }
}
