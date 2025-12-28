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
import { ChangeTypeUserUseCase } from '@/domain/aplication/use-cases/user/change-type-user-use-case';
import { User_Types } from '@/core/types/type-user';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt-strategy';
import { AuthGuard } from '@nestjs/passport';

const defineTypeUserBodyValidation = z.object({
  typeUser: z.enum(User_Types),
  storeName: z.string().optional(),
});

type DefineTypeUserBodyValidation = z.infer<
  typeof defineTypeUserBodyValidation
>;
const bodyValidationPipe = new ZodValidationPipe(defineTypeUserBodyValidation);

@Controller('/define/type/accounts')
@UseGuards(AuthGuard('jwt'))
export class DefineTypeUserController {
  constructor(public defineTypeUserUseCase: ChangeTypeUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: DefineTypeUserBodyValidation,
    @CurrentUser() userToken: TokenPayloadSchema,
  ) {
    const { typeUser, storeName } = body;

    const result = await this.defineTypeUserUseCase.execute({
      id: userToken.sub,
      typeUser,
      storeName,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserNameAlreadyExistError:
          throw new ConflictException(error.message);
        case EmailAlreadyExistError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
