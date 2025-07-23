import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, ClientsModule],
})
export class AppModule {}
