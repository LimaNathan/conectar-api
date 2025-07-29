import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './error/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Conéctar Clientes')
    .setDescription(
      'Documentação da API de controle de clientes para o teste técnico da Conéctar',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();




  const document = SwaggerModule.createDocument(app, config);

  document.tags = document.tags?.sort((a, b) => a.name.localeCompare(b.name));

  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new PrismaClientExceptionFilter());

    app.enableCors({
      origin: [
        'https://conectar-fe.vercel.app',
        'https://conectar-fe-limanathans-projects.vercel.app/',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
