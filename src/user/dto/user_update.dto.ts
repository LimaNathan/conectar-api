import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserUpdateDTO {
  @ApiPropertyOptional({
    example: 'Nathan Lima',
    description: 'Nome completo atualizado do usuário.',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'nathan.o.aguiar@gmail.com',
    description: 'Novo e-mail do usuário. Deve ser válido e único.',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email?: string;

  @ApiPropertyOptional({
    example: 'novasenha123',
    description: 'Nova senha do usuário. Mínimo de 6 caracteres.',
  })
  @IsOptional()
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres.' })
  password?: string;
  @ApiPropertyOptional({
    example: 'USER',
    description: 'Role do usuário, só pode ser alterada por um ADMIN',
  })
  @IsOptional()
  role?: Role;
}
