import { Global, Module } from '@nestjs/common';
import { UserModule } from '../../libs/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class DomainsModule {}
