import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserCreateDTO } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth_user.dto';
import { JwtAuthGuard } from './guards/jwt-aut.guard';
import { RolesGuard } from './guards/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from './decorator/roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar um novo usuário (APENAS ADMINISTRADRES)',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  singup(@Body() body: UserCreateDTO) {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: 'Login do usuário.' })
  @ApiResponse({ status: 200, description: 'Retorna um token JWT' })
  @Post('login')
  login(@Body() body: AuthUserDTO) {
    return this.authService.login(body);
  }
}
