import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthUserDTO {
  @IsEmail({}, { message: 'Insira um email válido.' })
  email: string;
  @IsNotEmpty({
    message: 'A senha não pode ficar vazia.',
  })
  password: string;
}
