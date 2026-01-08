// import { PipeTransform, BadRequestException } from '@nestjs/common';
// import { ZodError, ZodSchema } from 'zod';

// export class ZodValidationPipe implements PipeTransform {
//   constructor(private schema: ZodSchema) {}

//   transform(value: unknown) {
//     try {
//       return this.schema.parse(value);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         throw new BadRequestException({
//           message: 'Validation failed',
//           statusCode: 400,
//         });
//       }

//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }
// }
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    return result.data;
  }
}
