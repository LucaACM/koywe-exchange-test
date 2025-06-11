import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsQueryBoolean } from '../validators/is-query-boolean.decorator';

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class BaseFindDto {
  @ApiProperty({ type: String })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number = 0;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({
    type: String,
    enum: SortDirection,
    enumName: 'SortDirection',
  })
  @IsEnum(SortDirection)
  @IsOptional()
  order?: SortDirection;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean = false;

  @ApiProperty({ type: Boolean })
  @IsQueryBoolean()
  @IsOptional()
  populate?: boolean = false;
}
