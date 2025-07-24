import { ClientStatus, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@conectar.com';

  // Verifica e cria usuário admin
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASS || 'Adm1n1str4t0r',
      10,
    );

    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log(`✅ Usuário admin criado: ${adminEmail}`);
  } else {
    console.log('ℹ️ Usuário admin já existe, não será recriado.');
  }

  // Dados de clientes mockados
  const mockClients = [
    {
      presentationName: 'Supermercado Bom Preço',
      corporateReason: 'Bom Preço Alimentos e Varejo Ltda.',
      CNPJ: '12345678000199',
      public: false,

      conectaPlus: true,
      tags: ['supermercado', 'varejo', 'alimentação'],
      address: {
        create: {
          street: 'Av. Central',
          number: '1000',
          complement: null,
          district: 'Centro',
          city: 'Fortaleza',
          state: 'CE',
          zipCode: '60000000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Mercadinho Econômico',
      corporateReason: 'Econômico Comércio de Alimentos Ltda.',
      CNPJ: '56789012000110',
      public: true,
      clienStatus: ClientStatus.ACTIVE,
      conectaPlus: false,
      tags: ['mercadinho', 'varejo', 'alimentos'],
      address: {
        create: {
          street: 'Rua dos Comerciantes',
          number: '345',
          complement: null,
          district: 'Bairro Novo',
          city: 'Fortaleza',
          state: 'CE',
          zipCode: '60123000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Alimentos Nordestinos',
      corporateReason: 'Nordestinos Indústria Alimentícia S.A.',
      CNPJ: '90817234000188',
      public: false,

      conectaPlus: true,
      tags: ['indústria', 'alimentícia', 'atacado'],
      address: {
        create: {
          street: 'Rua do Milho',
          number: '89',
          complement: null,
          district: 'Distrito Industrial',
          city: 'Campina Grande',
          state: 'PB',
          zipCode: '58400000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Distribuidora São Jorge',
      corporateReason: 'São Jorge Distribuição e Logística de Alimentos Ltda.',
      CNPJ: '23456789000177',
      public: true,
      clienStatus: ClientStatus.ACTIVE,
      conectaPlus: false,
      tags: ['distribuidora', 'alimentos', 'atacado'],
      address: {
        create: {
          street: 'Av. Brasil',
          number: '2222',
          complement: 'Galpão 3',
          district: 'Porto',
          city: 'Recife',
          state: 'PE',
          zipCode: '50000000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Rede Alimentar Nordeste',
      corporateReason: 'Rede Alimentar Nordeste Ltda.',
      CNPJ: '34567891000166',
      public: true,
      clienStatus: ClientStatus.ACTIVE,
      conectaPlus: true,
      tags: ['supermercado', 'rede', 'nordeste'],
      address: {
        create: {
          street: 'Rua das Frutas',
          number: '505',
          complement: null,
          district: 'Feira Central',
          city: 'Natal',
          state: 'RN',
          zipCode: '59000000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Empório do Norte',
      corporateReason: 'Empório do Norte Alimentos Finos Ltda.',
      CNPJ: '45678901000155',
      public: false,

      conectaPlus: false,
      tags: ['empório', 'produtos naturais', 'alimentos'],
      address: {
        create: {
          street: 'Rua das Ervas',
          number: '77',
          complement: 'Loja 1',
          district: 'Aldeota',
          city: 'Fortaleza',
          state: 'CE',
          zipCode: '60170000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Mercado São Luiz',
      corporateReason: 'Mercado São Luiz Comércio de Alimentos Ltda.',
      CNPJ: '67890123000144',
      public: true,
      clienStatus: ClientStatus.ACTIVE,
      conectaPlus: true,
      tags: ['mercado', 'familiar', 'alimentos'],
      address: {
        create: {
          street: 'Av. Independência',
          number: '999',
          complement: null,
          district: 'Joaquim Távora',
          city: 'Fortaleza',
          state: 'CE',
          zipCode: '60455000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Feira Fácil',
      corporateReason: 'Feira Fácil Atacado de Alimentos Ltda.',
      CNPJ: '78901234000133',
      public: false,

      conectaPlus: false,
      tags: ['atacado', 'feira', 'produtos locais'],
      address: {
        create: {
          street: 'Rua dos Feirantes',
          number: '31',
          complement: null,
          district: 'Mercado Central',
          city: 'Teresina',
          state: 'PI',
          zipCode: '64000000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Viva Alimentos',
      corporateReason: 'Viva Produtos Naturais Ltda.',
      CNPJ: '89012345000122',
      public: true,
      clienStatus: ClientStatus.ACTIVE,
      conectaPlus: false,
      tags: ['orgânicos', 'naturais', 'alimentação saudável'],
      address: {
        create: {
          street: 'Rua Verde Vida',
          number: '10',
          complement: null,
          district: 'Centro',
          city: 'João Pessoa',
          state: 'PB',
          zipCode: '58000000',
          country: 'Brasil',
        },
      },
    },
    {
      presentationName: 'Super Econômico',
      corporateReason: 'Super Econômico Varejo de Alimentos Ltda.',
      CNPJ: '90123456000111',
      public: false,

      conectaPlus: true,
      tags: ['supermercado', 'descontos', 'varejo'],
      address: {
        create: {
          street: 'Rua dos Preços Baixos',
          number: '888',
          complement: null,
          district: 'Promoção',
          city: 'Maceió',
          state: 'AL',
          zipCode: '57000000',
          country: 'Brasil',
        },
      },
    },
  ];

  // Criação dos clientes caso não existam (CNPJ como verificação)
  for (const client of mockClients) {
    const exists = await prisma.client.findUnique({
      where: {
        CNPJ: client.CNPJ,
      },
    });

    if (!exists) {
      await prisma.client.create({ data: client });
      console.log(
        `✅ Cliente criado: ${client.presentationName} (${client.CNPJ})`,
      );
    } else {
      console.log(`ℹ️ Cliente já existe: ${client.CNPJ}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
