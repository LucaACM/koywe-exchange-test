import { Test, TestingModule } from '@nestjs/testing';
import { UserApplicationService } from './user-application.service';
import { UserRepositoryService } from './user-repository.service';
import { FindUsersDto } from '../controller/dto/find-users.dto';

describe('UserApplicationService', () => {
  let service: UserApplicationService;
  let repository: jest.Mocked<UserRepositoryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserApplicationService,
        {
          provide: UserRepositoryService,
          useValue: {
            findAll: jest.fn(),
            getTotalItems: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(UserApplicationService);
    repository = module.get(UserRepositoryService);
  });

  it('should return paginated users', async () => {
    const dto: FindUsersDto = { limit: 10 } as any;
    (repository.findAll as jest.Mock).mockResolvedValue([{ username: 'test' }]);
    (repository.getTotalItems as jest.Mock).mockResolvedValue(1);

    const result = await service.findUsersBy(dto);
    expect(result.items[0].username).toBe('test');
    expect(result.totalItems).toBe(1);
    expect(result.limit).toBe(10);
  });
});