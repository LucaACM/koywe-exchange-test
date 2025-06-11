import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from 'src/user/services/user-repository.service';

@Injectable()
export class JwtProviderService extends PassportStrategy(
  Strategy,
) {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userReporsitory: UserRepositoryService,
  ) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error(
        'JWT_SECRET is not defined in configuration',
      );
    }
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.userReporsitory.findOne({
      _id: payload.sub,
    });
    if (!user) throw new UnauthorizedException();
    return { id: user._id, email: user.username };
  }

  sign(payload: { sub: string; username: string }) {
    return this.jwtService.sign(payload);
  }
}
