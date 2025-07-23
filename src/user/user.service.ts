import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserCreateDTO } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async create(data: UserCreateDTO) {
    const hash = await bcrypt.hash(data.password, 10);

    data.password = hash;
    return this.prisma.user.create({
      data: data,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}
