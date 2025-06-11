import { SchemaOptions } from '@nestjs/mongoose';

export const DEFAULT_SCHEMA_CONFIG: SchemaOptions = {
  timestamps: true,
  optimisticConcurrency: true,
  strict: 'throw',
  strictQuery: 'throw',
  collation: {
    locale: 'en',
  },
};
