import { validateSync } from "class-validator";
import { IUser } from "../user.interface";

export interface IPlainToInstance {
  plainToInstance(): void;
}

export const PLAIN_TO_INSTANCE = async function (this: IUser) {
  validateSync(this, { whitelist: true });
}; // TODO
