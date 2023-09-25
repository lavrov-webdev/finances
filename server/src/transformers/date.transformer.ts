import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

@Injectable()
export class DateTransformer implements PipeTransform<string, string> {
  transform(value: string) {
    const isoDate = new Date(value).toISOString();
    return isoDate;
  }
}

export const datePropertyTranformer = (param: TransformFnParams) => {
  try {
    return new Date(param.value).toISOString();
  } catch (e) {
    throw new BadRequestException([`${param.key} must be valid date string`]);
  }
};
