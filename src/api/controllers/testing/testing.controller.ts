import { Controller, Delete } from "@nestjs/common";
import { baseTestingUrl, testingEndpoints } from "../../../../libs/shared/endpoints";
import { CommandBus } from "@nestjs/cqrs";
import { DeleteAllCommandHandler } from "../../../../libs/testing/delete-all.command-handler";

@Controller(baseTestingUrl)
export class TestingController {
  constructor(private readonly commandBus: CommandBus) {
  }
  @Delete(testingEndpoints.deleteAllData())
  async deleteAllData() {
    return this.commandBus.execute(new DeleteAllCommandHandler())
  }
}