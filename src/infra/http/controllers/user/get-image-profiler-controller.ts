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
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { GetImageUserProfileUseCase } from '@/domain/aplication/use-cases/user/get-image-user-profile';
import z from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const getImageBodyValidation = z.object({
  userName: z.string(),
});

type GetImageBodyValidation = z.infer<typeof getImageBodyValidation>;

const bodyValidationPipe = new ZodValidationPipe(getImageBodyValidation);

@Controller('/get/image/:user')
@UseGuards(AuthGuard('jwt'))
export class GetImageProfilerController {
  constructor(public getImageProfilerUseCase: GetImageUserProfileUseCase) {}
  @Get()
  @HttpCode(200)
  async handle(@Param(getImageBodyValidation) params: GetImageBodyValidation) {
    const result = await this.getImageProfilerUseCase.execute({
      userName: params.userName,
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
