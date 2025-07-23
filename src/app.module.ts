import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
