import { Module } from '@nestjs/common';
import { JwtServiceService } from './jwt/jwt.service.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [UserModule, EncryptionModule],
  providers: [JwtServiceService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
