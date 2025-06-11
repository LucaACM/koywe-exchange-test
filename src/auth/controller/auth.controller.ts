import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../controller/dto/signup.dto';
import { LoginDto } from '../controller/dto/login.dto';
import { AuthApplicationService } from '../services/auth-application.service';

@ApiTags('auth')
@ApiBearerAuth('JWT')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user =
      await this.authApplicationService.signup(signupDto);
    return {
      status: 201,
      data: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user =
      await this.authApplicationService.login(loginDto);
    return {
      status: 200,
      data: user,
    };
  }
}
