import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma_service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('...should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('...deve retornar um usuário pelo e-mail', async () => {
    const mockUser = {
      id: 1,
      email: 'email-test@email.com',
      name: 'Usuário de teste',
    };

    prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    const user = await service.findByEmail('email-test@email.com');
    expect(user).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'email-test@email.com',
      },
    });
  });
});
