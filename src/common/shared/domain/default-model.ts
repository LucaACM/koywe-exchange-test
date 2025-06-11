import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class DefaultModel {
  constructor(partial: Partial<DefaultModel>) {
    Object.assign(this, partial);
    this._id = String(partial._id);
  }

  @ApiProperty({ type: 'string' })
  @Transform(({ value }) => {
    if (value instanceof Types.ObjectId) {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    throw new BadRequestException('Invalid ObjectId');
  })
  _id?: Types.ObjectId | string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}
