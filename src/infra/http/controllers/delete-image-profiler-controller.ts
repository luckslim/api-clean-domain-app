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
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UserNameAlreadyExistError } from '@/core/errors/username-already-exist-error';
import { EmailAlreadyExistError } from '@/core/errors/email-already-exist-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { DeleteImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/delete-image-user-profile';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('/delete/image/accounts')
@UseGuards(AuthGuard('jwt'))
export class DeleteImageProfilerController {
  constructor(
    public deleteImageProfilerUseCase: DeleteImageUserProfileUseCase,
  ) {}

  @Post()
  @HttpCode(204)
  async handle(@CurrentUser() userToken: TokenPayloadSchema) {
    const result = await this.deleteImageProfilerUseCase.execute({
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
  }
}
