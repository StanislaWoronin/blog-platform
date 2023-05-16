import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../libs/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ConfigService],
})
export class AppModule {}
