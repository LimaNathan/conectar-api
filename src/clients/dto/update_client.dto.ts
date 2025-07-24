import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { AddressDTO } from './create_client.dto';

export class UpdateClientDTO {
  @ApiPropertyOptional({
    example: 'Conecta Agro LTDA',
    description:
      'Nome fantasia da empresa. Pode ser usado como nome de exibição.',
  })
  @IsOptional()
  @IsString()
  presentationName?: string;

  @ApiPropertyOptional({
    example: '12345678000199',
    description: 'CNPJ da empresa, enviado apenas com números (sem pontuação).',
  })
  @IsOptional()
  @IsString()
  CNPJ?: string;

  @ApiPropertyOptional({
    example: 'Conecta Agro Tecnologia e Soluções S.A.',
    description: 'Razão social da empresa (nome jurídico).',
  })
  @IsOptional()
  @IsString()
  corporateReason?: string;

  @ApiPropertyOptional({
    description:
      'Objeto com os dados do endereço que será atualizado/criado para este cliente.',
  })
  @IsOptional()
  address?: {
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
  tags?: string[];
}
