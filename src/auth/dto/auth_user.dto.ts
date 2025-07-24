import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDTO {
  @ApiProperty({
    example: 'nathan.o.aguiar@gmail.com',
    description: 'E-mail do usuário. Usado como identificador de login.',
  })
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email: string;
  
  @IsNotEmpty({ message: 'A senha não pode ficar vazia.' })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário. Deve conter ao menos 6 caracteres.',
  })
  password: string;
}
