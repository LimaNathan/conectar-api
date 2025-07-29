import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserCreateDTO {
  @ApiProperty({
    example: 'Nathan Lima',
    description: 'Nome completo do usuário.',
  })
  @IsNotEmpty({ message: 'O nome não pode ficar vazio.' })
  name: string;
  @ApiProperty({
    example: 'Nathan Lima',
    description: 'Nome completo do usuário.',
  })
  @IsOptional()
  role?: Role;

  @ApiProperty({
    example: 'nathan.o.aguiar@gmail.com',
    description: 'E-mail do usuário. Será utilizado como login.',
  })
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha de acesso do usuário. Mínimo de 6 caracteres.',
  })
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres.' })
  password: string;
}
