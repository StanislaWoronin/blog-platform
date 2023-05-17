import { Body, Controller, Post } from '@nestjs/common';
import { UserFacade } from '../../../../../libs/user/aplication-services';
import { CreateUserDto } from './dto/create-user.dto';
import { baseSaUrl } from "../../../../../libs/shared/endpoints";

@Controller(baseSaUrl)
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userFacade.commands.createUser(createUserDto, true);
  }
}
