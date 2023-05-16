import { Module } from "@nestjs/common";
import { UserController } from "./sa/users/user.controller";

@Module({
  controllers: [UserController],
})
export class ControllersModule {}
