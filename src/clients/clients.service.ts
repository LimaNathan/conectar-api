import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma_service';

@Injectable()
export class ClientsService {
  constructor(prisma: PrismaService) {}

  async findAllPaginated(
    page: number = 1,
    size: number = 10,
    order: 'asc' | 'desc' = 'desc',
    filters?: {
      corporateReason?: string;
      tags?: string[];
      presentationName?: string;
    },
  ) {
    const skip = (page - 1) * size;
    const where: any = {};

    if (filters?.presentationName) {
      where.presentationName = {
        contains: filters.presentationName,
        mode: 'insensitive',
      };
    }

    if (filters?.corporateReason) {
      where.corporateReason = {
        contains: filters.corporateReason,
        mode: 'insensitive',
      };
    }
  }
}
