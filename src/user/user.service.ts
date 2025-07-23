import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDTO } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma_service';
import { UserUpdateDTO } from './dto/user_update.dto';
import { NotFoundError } from 'rxjs';

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

  async updateUser(dto: UserUpdateDTO, id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const updateData: any = { ...dto };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });
  }
}
