import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserCreateDTO } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth_user.dto';
import { JwtAuthGuard } from './guards/jwt-aut.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorator/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  singup(@Body() body: UserCreateDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthUserDTO) {
    return this.authService.login(body);
  }
}
