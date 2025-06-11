import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthApplicationService } from './auth-application.service';
import { UserRepositoryService } from 'src/user/services/user-repository.service';
import { JwtProviderService } from './jwt-provider.service';
import { SignupDto } from '../controller/dto/signup.dto';
import { LoginDto } from '../controller/dto/login.dto';

describe('AuthApplicationService', () => {
  let service: AuthApplicationService;
  let userRepository: jest.Mocked<UserRepositoryService>;
  let jwtProvider: jest.Mocked<JwtProviderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthApplicationService,
        {
          provide: UserRepositoryService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtProviderService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthApplicationService);
    userRepository = module.get(UserRepositoryService);
    jwtProvider = module.get(JwtProviderService);
  });

  describe('signup', () => {
    it('should create user and return token', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockResolvedValue({
        _id: '1',
        username: 'test',
      });
      (jwtProvider.sign as jest.Mock).mockReturnValue('token');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

      const dto: SignupDto = {
        username: 'test',
        password: 'pass',
      } as SignupDto;
      const result = await service.signup(dto);
      expect(result).toEqual({ accessToken: 'token' });
      expect(userRepository.create).toHaveBeenCalled();
    });

    it('should throw if username already exists', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue({});
      const dto: SignupDto = {
        username: 'test',
        password: 'pass',
      } as SignupDto;
      await expect(service.signup(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should return token for valid credentials', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue({
        _id: '1',
        username: 'test',
        password: 'hashed',
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      (jwtProvider.sign as jest.Mock).mockReturnValue('token');

      const dto: LoginDto = { username: 'test', password: 'pass' } as LoginDto;
      const result = await service.login(dto);
      expect(result).toEqual({ accessToken: 'token' });
    });

    it('should throw if user not found', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      const dto: LoginDto = { username: 'test', password: 'pass' } as LoginDto;
      await expect(service.login(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('should throw if password invalid', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue({
        username: 'test',
        password: 'hashed',
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      const dto: LoginDto = { username: 'test', password: 'pass' } as LoginDto;
      await expect(service.login(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });
  });
});
