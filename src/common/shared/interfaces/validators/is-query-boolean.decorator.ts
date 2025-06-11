import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export const IsQueryBoolean = () =>
  applyDecorators(
    Transform((ctx: { value: string | boolean }) => {
      if (typeof ctx.value === 'boolean') {
        return ctx.value;
      }

      return ctx.value === 'true' || ctx.value === '1';
    }),
    IsBoolean(),
  );
