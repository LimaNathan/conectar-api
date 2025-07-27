import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma_service';
import { ClientCreateDTO } from './dto/create_client.dto';
import { UpdateClientDTO } from './dto/update_client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: ClientCreateDTO) {
    return this.prisma.client.create({
      data: data,
    });
  }
  async findAllPaginated(
    page: number = 1,
    size: number = 10,
    order: 'asc' | 'desc' = 'desc',

    userId: number,
    userRole: Role,
    filters?: {
      corporateReason?: string;
      tags?: string[];
      presentationName?: string;
      status?: boolean;
      conectaPlus?: boolean;
      cnpj?: string;
    },
  ) {
    const isAdmin = userRole === 'ADMIN';
    const userCanEdit = await this.prisma.userClient.findMany({
      where: {
        userId: userId,
      },
    });

    const canEditIds: number[] = userCanEdit.map((e) => e.clientId);
    const skip = (page - 1) * size;
    const where: any = {};

    if (canEditIds.length === 0 && !isAdmin) {
      const publicCount = await this.prisma.client.count({
        where: { public: true },
      });

      if (publicCount === 0) {
        throw new NotFoundException(
          'Nenhum cliente disponível para você no momento.',
        );
      }
    }

    if (!isAdmin) {
      where.OR = [{ id: { in: canEditIds } }, { public: true }];
    }

    if (filters?.presentationName) {
      where.presentationName = {
        contains: filters.presentationName,
        mode: 'insensitive',
      };
    }
    if (filters?.cnpj) {
      where.CNPJ = {
        contains: filters.cnpj,
        mode: 'insensitive',
      };
    }

    if (filters?.corporateReason) {
      where.corporateReason = {
        contains: filters.corporateReason,
        mode: 'insensitive',
      };
    }

    if (filters?.tags) {
      where.tags = {
        contains: filters.tags,
        mode: 'insensitive',
      };
    }

    if (filters?.status != null) {
      where.clientStatus = {
        contains: filters.status ? 'ACTIVE' : 'INACTIVE',
        mode: 'insensitive',
      };
    }
    if (filters?.conectaPlus != null) {
      where.status = {
        contains: filters.conectaPlus,
        mode: 'insensitive',
      };
    }

    const [clients, total] = await Promise.all([
      this.prisma.client.findMany({
        skip,
        take: Number(size),
        orderBy: { createdAt: order },
        where,
        select: {
          id: true,
          presentationName: true,
          corporateReason: true,
          CNPJ: true,
          public: true,
          clientStatus: true,
          conectaPlus: true,
          tags: true,
          address: true,
        },
      }),
      this.prisma.client.count({ where }),
    ]);

    return {
      data: clients,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / size),
        perPage: size,
      },
    };
  }

  async updateClient(
    data: UpdateClientDTO,
    clientId: number,
    userId: number,
    userRole: Role,
  ) {
    const isAdmin = userRole === 'ADMIN';
    const userCanEdit = await this.prisma.userClient.findUnique({
      where: {
        userId_clientId: {
          userId: userId,
          clientId: clientId,
        },
      },
    });

    if (!userCanEdit && !isAdmin) {
      throw new ForbiddenException(
        'Você não pode alterar esse cliente, entre em contato com seu superiror',
      );
    }

    const updateData: any = {};

    if (data.CNPJ) updateData.CNPJ = data.CNPJ;

    if (data.address) updateData.address = data.address;

    if (data.conectaPlus) updateData.conectaPlus = data.conectaPlus;

    if (data.corporateReason) updateData.corporateReason = data.corporateReason;

    if (data.presentationName)
      updateData.presentationName = data.presentationName;

    if (data.tags) updateData.tags = data.tags;

    return this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: updateData,
    });
  }

  async deleteClient(clientId: number) {
    await this.prisma.userClient.deleteMany({
      where: {
        clientId: clientId,
      },
    });

    return this.prisma.client.delete({
      where: {
        id: clientId,
      },
    });
  }

  async addUserToClient(userId: number, clientId: number) {
    console.log(userId);
    console.log(clientId);

    const alreadyExists = await this.prisma.userClient.findUnique({
      where: {
        userId_clientId: {
          userId: Number(userId),
          clientId: Number(clientId),
        },
      },
    });

    if (alreadyExists)
      throw new ConflictException('Usuário já está relacionado a esse client.');

    return this.prisma.userClient.create({
      data: {
        userId: Number(userId),
        clientId: Number(clientId),
      },
    });
  }
}
