import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { DefaultModel } from 'src/common/shared/domain/default-model';
import { DEFAULT_SCHEMA_CONFIG } from 'src/common/shared/infraestructure/database/configuration/default-schema';

@Schema({ ...DEFAULT_SCHEMA_CONFIG, collection: 'users' })
export class User extends DefaultModel {
  constructor(partial: Partial<User>) {
    super(partial);
    Object.assign(this, partial);
  }

  @ApiProperty({ type: 'string' })
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  @Exclude()
  password?: string;

  @Prop({ type: Date, required: false, nullable: true })
  @Exclude()
  deletedAt?: Date;

  @Prop({ type: Boolean, default: false })
  @Exclude()
  isDeleted?: boolean;
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };