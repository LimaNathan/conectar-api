import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { OrderDirection } from '../enum/order_direction.enum';
export class UserPaginationQueryDTO {
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
  @IsOptional({})
  @ApiProperty({ example: OrderDirection.DESC, nullable: true })
  order?: OrderDirection = OrderDirection.DESC;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nathan Lima', nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'nathan.o.aguiar@gmail.com', nullable: true })
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ example: Role.USER, nullable: true })
  role?: Role;
}
