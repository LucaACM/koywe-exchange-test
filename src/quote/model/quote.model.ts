import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CurrencyCode } from 'src/common/enums/currency-code.enum';
import { DefaultModel } from 'src/common/shared/domain/default-model';
import { DEFAULT_SCHEMA_CONFIG } from 'src/common/shared/infraestructure/database/configuration/default-schema';

@Schema({ ...DEFAULT_SCHEMA_CONFIG, collection: 'quotes' })
export class Quote extends DefaultModel {
  constructor(partial: Partial<Quote>) {
    super(partial);
    Object.assign(this, partial);
  }

  @ApiProperty({ type: 'number' })
  @Prop({ type: Number, required: true })
  amount: number;

  @ApiProperty({ type: 'number' })
  @Prop({ type: Number, required: true })
  exchangeRate: number;

  @ApiProperty({ enum: CurrencyCode, enumName: 'CurrencyCode' })
  @Prop({ type: String, enum: CurrencyCode, required: true })
  from: CurrencyCode;

  @ApiProperty({ enum: CurrencyCode, enumName: 'CurrencyCode' })
  @Prop({ type: String, enum: CurrencyCode, required: true })
  to: CurrencyCode;

  @ApiProperty({ type: Date })
  @Prop({ type: Date, required: true })
  @Exclude()
  expiresAt: Date;

  @ApiProperty({ type: Date })
  @Prop({ type: Date, required: true })
  timestamp: Date;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  identifier: string;

  @ApiProperty({ type: Number, required: true })
  @Prop({ type: Number, required: true })
  convertedAmount: number;

  @Prop({ type: Date, required: false, nullable: true })
  @Exclude()
  deletedAt?: Date;

  @Prop({ type: Boolean, default: false })
  @Exclude()
  isDeleted?: boolean;
}

export type QuoteDocument = Quote & Document;
const QuoteSchema = SchemaFactory.createForClass(Quote);

export { QuoteSchema };
