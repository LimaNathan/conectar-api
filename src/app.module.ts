import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './error/prisma-exception.filter';
@Module({
  imports: [PrismaModule, AuthModule, UserModule, ClientsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
