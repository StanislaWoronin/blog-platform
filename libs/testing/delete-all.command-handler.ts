import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaClient } from "@prisma/client";
import { DeleteAllCommand } from "./delete-all.command";

@CommandHandler(DeleteAllCommand)
export class DeleteAllCommandHandler implements ICommandHandler {
  private readonly prisma = new PrismaClient();

  async execute(command: any): Promise<any> {
    const tables = await this.prisma.$queryRawUnsafe(
      `
        SELECT tablename FROM pg_tables WHERE schemaname = 'public';
      `
    );
    console.log(tables);
    // @ts-ignore
    const truncateQueries = tables.map(({ tablename }) => `TRUNCATE ${tablename} RESTART IDENTITY CASCADE;`);

    await this.prisma.$queryRaw(truncateQueries.join(' '));
    console.log('База данных очищена');
  };
}