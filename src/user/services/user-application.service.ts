import {
  Injectable,
} from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { FindUsersDto } from '../controller/dto/find-users.dto';
import { User } from '../model/user.model';
import { PaginatedResult } from 'src/common/shared/application/paginated-result.interface';

@Injectable()
export class UserApplicationService {
  constructor(
    private readonly userRepository: UserRepositoryService,
  ) {}

  async findUsersBy(
    findUsersDto: FindUsersDto,
  ): Promise<PaginatedResult<User>> {
    const [users, totalItems] = await Promise.all([
      this.userRepository.findAll(findUsersDto),
      this.userRepository.getTotalItems(findUsersDto),
    ]);
    return {
      items: users.map((user) => new User(user)),
      totalItems,
      limit: findUsersDto.limit,
    };
  }
}
