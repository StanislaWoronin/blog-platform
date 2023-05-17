import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserFacade } from '../../../../../libs/user/aplication-services';
import { CreateUserDto } from './dto/create-user.dto';
import { baseSaUrl, SaEndpoints } from '../../../../../libs/shared/endpoints';
import { AuthBasicGuard } from '../../../../../libs/guards/basic-auth.guard';
import { UserQueryDto } from './dto/query';
import { ViewPage } from '../../../../../libs/shared/pagination/view-page';
import { ViewUser } from './response';

@UseGuards(AuthBasicGuard)
@Controller(baseSaUrl)
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post(SaEndpoints.create())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userFacade.commands.createUser(createUserDto, true);
  }

  @Get(SaEndpoints.getUsers())
  async getUsers(@Query() queryDto: UserQueryDto) {
    return await this.userFacade.query.getUsers(queryDto);
  }
}
