import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { AuthGuard } from '@nestjs/passport';
import { RequestFromEmployUseCase } from '@/domain/aplication/use-cases/store/get-request-from-employ';

@Controller('/get/request/employ')
@UseGuards(AuthGuard('jwt'))
export class GetRequestEmployeesController {
  constructor(public getRequestEmployeesUseCase: RequestFromEmployUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: TokenPayloadSchema) {
    const result = await this.getRequestEmployeesUseCase.execute({
      id: user.sub,
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

    const { employ } = result.value;

    return employ;
  }
}
