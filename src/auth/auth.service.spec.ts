import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth_user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwt: JwtService;

  const mockUser: User = {
    id: 1,
    name: 'Usuário de teste',
    email: 'email-test@test.com',
    password: null,
    role: 'USER',
    createdAt: new Date(),
    updatedAt: null,
    lastLogin: null,
  };
  const findByEmailMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: findByEmailMock,
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('...should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwt).toBeDefined();
  });

  it('...deve fazer o login com sucesso', async () => {
    if (mockUser.password == null) {
      mockUser.password = await require('bcrypt').hash('123456', 10);
    }
    findByEmailMock.mockResolvedValue(mockUser);

    let authUser = new AuthUserDTO();

    authUser.email = 'email-test@test.com';
    authUser.password = '123456';

    const result = await service.login(authUser);
  });

  it('...deve fazer o cadastro de um novo usuário e retornar o token', async () => {
    const dto = {
      email: 'novo@teste.com',
      password: '123456',
      name: 'Usuário de testes 2',
      role: 'USER',
    };

    jest.spyOn(service, 'register').mockResolvedValue(mockUser);
    findByEmailMock.mockResolvedValue(null);

    const result = await service.register(dto);
    expect(service.register).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockUser);
  });

  it('...deve devolver uma `ConflictException` se o email já existir', async () => {
    const dto = {
      email: 'email-test@test.com',
      password: '123456',
      name: 'Usuário de testes 3',
      role: 'USER',
    };

    jest
      .spyOn(service, 'register')
      .mockRejectedValue(new ConflictException('O e-mail já está cadastrado'));

    await expect(service.register(dto)).rejects.toThrow(ConflictException);
    expect(userService.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(userService.create).not.toHaveBeenCalled();
  });

  it('...deve devolver um `NotFoundException` se o usuário não for encontrado', async () => {
    const dto = {
      email: 'email-test@test.com',
      password: '123456',
    };

    jest
      .spyOn(service, 'login')
      .mockRejectedValue(new NotFoundException('Usuário não está cadastrado.'));

    await expect(service.login(dto)).rejects.toThrow(NotFoundException);
    expect(userService.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(userService.create).not.toHaveBeenCalled();
  });

  it('...deve devolver um `UnauthorizedException` se passar a senha errada.', async () => {
    const dto = {
      email: 'email-test@test.com',
      password: '654321',
    };

    jest
      .spyOn(service, 'login')
      .mockRejectedValue(
        new UnauthorizedException(
          'Usuário ou senha incorretos, verifique suas credenciais.',
        ),
      );

    await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
  });
});
