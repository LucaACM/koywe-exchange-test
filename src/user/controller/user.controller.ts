import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserApplicationService } from 'src/user/services/user-application.service';
import { FindUsersDto } from './dto/find-users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/model/user.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginatedResponse } from 'src/common/shared/interfaces/response.interface';

@ApiTags('users')
@ApiBearerAuth('JWT')
@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userApplicationService: UserApplicationService,
  ) {}

  @Get()
  async getUsers(
    @Query() query: FindUsersDto,
  ): Promise<PaginatedResponse<User>> {
    const { items, totalItems, limit } =
      await this.userApplicationService.findUsersBy(query);
    return {
      status: 200,
      data: {
        items,
        totalItems,
        limit,
      },
    };
  }
}
