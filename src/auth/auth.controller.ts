import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDTO } from 'src/user/dto/create_user.dto';
import { AuthUser } from './dto/auth_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards()
  @Post('register')
  singup(@Body() body: UserCreateDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthUser) {
    return this.authService.login(body);
  }
}
