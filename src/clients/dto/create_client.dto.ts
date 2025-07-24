import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ClientCreateDTO {
  @ApiPropertyOptional({
    example: 'Conecta Agro LTDA',
    description:
      'Nome fantasia da empresa. Pode ser usado como nome de exibição.',
  })
  @IsOptional()
  @IsString()
  presentationName?: string;

  @ApiProperty({
    example: '12345678000199',
    description: 'CNPJ da empresa, enviado apenas com números (sem pontuação).',
  })
  @IsString()
  @IsNotEmpty()
  CNPJ: string;

  @ApiProperty({
    example: 'Conecta Agro Tecnologia e Soluções S.A.',
    description: 'Razão social da empresa (nome jurídico).',
  })
  @IsString()
  @IsNotEmpty()
  corporateReason: string;

  @ApiProperty({
    description:
      'Objeto com os dados do endereço que será criado para este cliente.',
  })
  address: {
    create: AddressDTO;
  };

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se o cliente está integrado ao sistema Conecta Plus.',
  })
  @IsOptional()
  @IsBoolean()
  conectaPlus?: boolean;

  @ApiPropertyOptional({
    example: ['agro', 'clientes especiais'],
    description:
      'Lista de tags associadas ao cliente, úteis para filtros e buscas.',
  })
  @IsOptional()
  @IsArray()
  tags: string[];
}

export class AddressDTO {
  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Nome da rua do endereço',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '123', description: 'Número do endereço' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 'Apto 201',
    description: 'Complemento do endereço (opcional)',
  })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty({ example: 'Centro', description: 'Bairro do endereço' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'Fortaleza', description: 'Cidade do endereço' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'CE', description: 'Estado do endereço' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    example: '60000-000',
    description: 'CEP (código postal) do endereço',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: 'Brasil', description: 'País do endereço' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
