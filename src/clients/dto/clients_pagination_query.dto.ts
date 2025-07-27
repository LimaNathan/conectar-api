import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { OrderDirection } from 'src/user/enum/order_direction.enum';

export class ClientsPaginationQueryDTO {
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
  presentationName?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
  
  @IsOptional()
  @IsString()
  corporateReason?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  conectaPlus?: boolean;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
