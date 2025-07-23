import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthUserDTO {
  @IsEmail({}, { message: 'Insira um email válido.' })
  @ApiProperty({ example: 'nathan.o.aguiar@gmail.com' })
  email: string;
  @IsNotEmpty({
    message: 'A senha não pode ficar vazia.',
  })
  @ApiProperty({ example: '123456' })
  password: string;
}
