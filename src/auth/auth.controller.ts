import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDTO } from 'src/user/dto/create_user.dto';

@Controller('auth')
export class AuthController {
  constructor(authService: AuthService) {}

  @Post('register')
  singup(data: UserCreateDTO) {}
}
