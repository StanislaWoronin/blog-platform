import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DeleteAllCommandHandler } from "./delete-all.command-handler";

@Module({
  imports: [CqrsModule],
  providers: [DeleteAllCommandHandler]
})
export class TestingModule {}