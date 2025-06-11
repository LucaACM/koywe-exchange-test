import * as bcrypt from 'bcrypt';
import { UserRepositoryService } from 'src/user/services/user-repository.service';
import { JwtProviderService } from './jwt-provider.service';
import { SignupDto } from '../controller/dto/signup.dto';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../controller/dto/login.dto';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly jwtProviderService: JwtProviderService,
  ) {}

  async signup(
    dto: SignupDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = dto;
    const exists = await this.userRepository.findOne({
      username,
    });
    if (exists)
      throw new UnauthorizedException(
        'username already in use',
      );

    const hash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      username,
      password: hash,
    });

    const payload = {
      sub: String(user._id),
      username: user.username,
    };
    return {
      accessToken: this.jwtProviderService.sign(payload),
    };
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      username: dto.username,
    });
    if (!user)
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );

    const valid = await bcrypt.compare(
      dto.password,
      <string>user.password,
    );
    if (!valid)
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );

    const payload = {
      sub: String(user._id),
      username: user.username,
    };
    return {
      accessToken: this.jwtProviderService.sign(payload),
    };
  }
}
