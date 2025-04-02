import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata): any {
    try {
      return this.schema.parse(value);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log(error.issues);
        throw new BadRequestException(error.issues);
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
