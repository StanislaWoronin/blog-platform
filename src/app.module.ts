import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from '../libs/user/user.module';
import { SharedModule } from '../libs/shared/shared.module';
import { DomainsModule } from "./domains";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [ApiModule, DomainsModule, SharedModule, UserModule],
  providers: [ConfigService],
})
export class AppModule {}
