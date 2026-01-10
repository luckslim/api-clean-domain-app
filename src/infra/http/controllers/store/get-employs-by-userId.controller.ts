import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { GetEmployUseCase } from '@/domain/aplication/use-cases/store/get-employ-by-id';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('/get/employ')
@UseGuards(AuthGuard('jwt'))
export class GetEmployeesController {
  constructor(public getEmployeesUseCase: GetEmployUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: TokenPayloadSchema) {
    const result = await this.getEmployeesUseCase.execute({
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
