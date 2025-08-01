import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma_service';
import { UserCreateDTO } from './dto/create_user.dto';
import { UserUpdateDTO } from './dto/user_update.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateDTO) {
    const hash = await bcrypt.hash(data.password, 10);

    data.password = hash;
    const createdUser = await this.prisma.user.create({
      data: data,
    });

    createdUser.password = null;
    return createdUser;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async updateUser(
    data: UserUpdateDTO,
    id: number,
    targetUserId: number,
    userRole: Role,
  ) {

    const isAdmin = userRole === 'ADMIN';
    const isSelf = id === targetUserId;

    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }


    if (!isSelf && !isAdmin) {
      throw new ForbiddenException('Você só pode editar sua própria conta.');
    }
    const updateData: any = {};

    if (data.email && isAdmin) updateData.email = data.email;

    if (data.name) updateData.name = data.name;

    if (data.password)
      updateData.password = await bcrypt.hash(data.password, 10);

    if (data.role) updateData.role = data.role;

    return this.prisma.user.update({
      where: { id: targetUserId },
      data: updateData,
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.userClient.deleteMany({
      where: {
        userId: userId,
      },
    });
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findAllPaginated(
    page: number = 1,
    size: number = 10,
    order: 'asc' | 'desc' = 'desc',
    filters?: {
      name?: string;
      email?: string;
      role?: Role;
    },
  ) {
    const skip = (page - 1) * size;

    const where: any = {};

    if (filters?.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }

    if (filters?.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }

    if (filters?.role) {
      where.role = filters.role;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: Number(size),
        orderBy: { createdAt: order },
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          lastLogin: true,
        },
      }),

      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / size),
        perPage: size,
      },
    };
  }

  async findAllUsersWithoutLoginUntilThirtyDays(
    page: number = 1,
    size: number = 10,
    order: 'asc' | 'desc' = 'desc',
    filters?: {
      name?: string;
      email?: string;
      role?: Role;
    },
  ) {
    const skip = (page - 1) * size;
    const THIRTY_DAYS_AGO = new Date();
    THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);
    const where: any = {
      lastLogin: {
        not: null,
        lt: THIRTY_DAYS_AGO,
      },
    };

    if (filters?.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }

    if (filters?.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }

    if (filters?.role) {
      where.role = filters.role;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: Number(size),
        orderBy: { createdAt: order },
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          lastLogin: true,
        },
      }),
      this.prisma.user.count({
        where,
      }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / size),
        perPage: size,
      },
    };
  }
}
