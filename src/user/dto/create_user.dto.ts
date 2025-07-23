import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty({
    message: 'O nome não pode ficar vazio!',
  })
  name: string;
  @IsEmail(
    {},
    {
      message: 'Insira um e-mail válido.',
    },
  )
  email: string;
  @MinLength(6, {
    message: 'A senha deve conter pelo menos 6 caracteres.',
  })
  password: string;
}
