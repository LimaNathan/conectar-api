import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDirection } from '../enum/order_direction.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
export class PaginationQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: 1 })
  page?: number = 1;
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: 10 })
  size?: number = 10;

  @IsEnum(OrderDirection)
  @IsOptional()
  @ApiProperty({ example: OrderDirection.DESC })
  order?: OrderDirection = OrderDirection.DESC;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
