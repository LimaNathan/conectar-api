import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserCreateDTO {
  @IsNotEmpty({
    message: 'O nome não pode ficar vazio!',
  })
  @ApiProperty({ example: 'Nathan Lima' })
  name: string;
  @IsEmail(
    {},
    {
      message: 'Insira um e-mail válido.',
    },
  )
  @ApiProperty({ example: 'nathan.o.aguiar@gmail.com' })
  email: string;
  @MinLength(6, {
    message: 'A senha deve conter pelo menos 6 caracteres.',
  })
  @ApiProperty({ example: '123456' })
  password: string;
}
