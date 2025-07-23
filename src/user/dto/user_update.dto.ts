import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserUpdateDTO {
  @IsOptional()
  @ApiPropertyOptional({ example: 'Nathan Lima' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  @ApiPropertyOptional({ example: 'nathan.o.aguiar@gmail.com' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres.' })
  @ApiPropertyOptional({ example: '123456' })
  password?: string;
}
