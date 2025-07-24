# API Conectar - Teste Técnico

## Introdução

Esta é a API de back-end para o teste técnico da Conéctar. O projeto consiste em um sistema de gerenciamento de usuários e clientes, incluindo um sistema de autenticação robusto baseado em JWT. A API foi construída utilizando NestJS e segue as melhores práticas de desenvolvimento, como arquitetura modular e separação de responsabilidades.

## Tecnologias Principais

- **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** [Passport.js](https://www.passportjs.org/) com estratégia JWT
- **Validação:** `class-validator` e `class-transformer` para DTOs
- **Containerização:** [Docker](https://www.docker.com/) para o ambiente de banco de dados

## Arquitetura e Decisões de Design

A API foi estruturada de forma modular para garantir escalabilidade e manutenibilidade.

- **Módulos:** A aplicação é dividida em módulos principais:
  - `AuthModule`: Responsável pela autenticação de usuários, geração e validação de tokens JWT.
  - `UserModule`: Gerencia as operações de CRUD para os usuários.
  - `ClientsModule`: Gerencia as operações de CRUD para os clientes.
  - `PrismaModule`: Fornece uma instância do serviço do Prisma para os outros módulos, centralizando a comunicação com o banco de dados.

- **ORM com Prisma:** O Prisma foi escolhido como ORM para facilitar a interação com o banco de dados PostgreSQL, oferecendo tipagem segura e um schema declarativo (`schema.prisma`) que serve como única fonte de verdade para a estrutura do banco.

- **Autenticação com JWT:** A segurança da API é garantida por um sistema de autenticação via JSON Web Tokens (JWT). Rotas protegidas utilizam Guards (`JwtAuthGuard`) para verificar a validade do token enviado no cabeçalho da requisição.

- **DTOs (Data Transfer Objects):** Para garantir que os dados que entram e saem da API estejam no formato correto, foram utilizados DTOs com `class-validator`. Isso centraliza as regras de validação e torna o código mais limpo e seguro.

## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar a aplicação localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/)

### 1. Clone o Repositório

```bash
git clone https://github.com/LimaNathan/conectar-api.git
cd conectar-api
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Banco de Dados com Docker

Para rodar a aplicação, você precisa de uma instância do PostgreSQL. O comando abaixo irá criar um container Docker com o banco de dados.

```bash
docker run --name conectar-postgres -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=conectar_db -p 5432:5432 -d postgres
```

Este comando irá:

- Criar um container chamado `conectar-postgres`.
- Configurar o usuário, senha e nome do banco de dados.
- Mapear a porta `5432` do container para a sua máquina local.
- Iniciar o container em modo detached (`-d`).

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (`api/conectar-api/.env`) e adicione a seguinte variável de ambiente para conectar ao banco de dados criado no passo anterior:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/conectar_db?schema=public"
```

### 5. Crie e Popule o Banco de Dados

Com o banco de dados rodando e as variáveis de ambiente configuradas, utilize o Prisma para criar as tabelas.

Execute o seguinte comando no terminal:

```bash
npx prisma db push
```

Este comando irá ler o arquivo `prisma/schema.prisma` e aplicar as mudanças no seu banco de dados, criando as tabelas `User` e `Client` bem como as demais necessárias.

#### **Lembrete Importante**

Caso o passo anterior não popule o banco com dados iniciais (como um usuário administrador), você pode usar o comando de "seed". O projeto está configurado para isso.

Execute o comando:

```bash
npx prisma db seed
```

Isso irá executar o script em `prisma/seed.ts` para popular o banco com dados de exemplo.

### 6. Inicie a Aplicação

Finalmente, para iniciar o servidor da API em modo de desenvolvimento, execute:

```bash
npm run start:dev
```

A aplicação estará rodando em `http://localhost:3000`. Você pode acessar a documentação da API (Swagger) em `http://localhost:3000/api`.
