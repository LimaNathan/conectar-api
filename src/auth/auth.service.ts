import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from 'src/user/dto/create_user.dto';
import { AuthUserDTO } from './dto/auth_user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthUserDTO) {
    const user = await this.userService.findByEmail(data.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      throw new UnauthorizedException(
        'Usuário ou senha incorretos, verifique suas credenciais.',
      );
    }

    return user;
  }

  async login(data: AuthUserDTO) {
    const user = await this.validateUser(data);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(data: UserCreateDTO) {
    const exists = await this.userService.findByEmail(data.email);
    if (exists) throw new ConflictException('Email já cadastrado.');
    await this.userService.create(data);
    const authUser = new AuthUserDTO();
    authUser.email = data.email;
    authUser.password = data.password;
    return this.login(authUser);
  }
}
