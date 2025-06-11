import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseFindDto } from 'src/common/shared/interfaces/dto/base-find.dto';

export class FindUsersDto extends BaseFindDto {
  @ApiProperty({ type: String, description: 'username' })
  @IsString()
  @IsOptional()
  username: string;
}
