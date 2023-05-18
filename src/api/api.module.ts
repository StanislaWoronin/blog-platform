import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { ProvidersModule } from "../../libs/providers/providers.module";

@Module({
  imports: [ControllersModule, ProvidersModule],
})
export class ApiModule {}
