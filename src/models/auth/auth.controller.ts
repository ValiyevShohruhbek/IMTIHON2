import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreate } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body() data: UserCreate,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(data);
    response.cookie('token', result.token, {
      httpOnly: true,
      maxAge: 3.1 * 60 * 1000,
    });

    const { token, ...registerData } = result;
    return registerData;
  }

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(data);

    response.cookie('token', result.token, {
      httpOnly: true,
      maxAge: 3.1 * 60 * 1000,
    });
    const { token, ...loginData } = result;

    return loginData;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    
    return 'Muvaffaqiyatli tizimdan chiqildi';
  }
}
