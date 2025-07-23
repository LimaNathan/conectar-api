import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
