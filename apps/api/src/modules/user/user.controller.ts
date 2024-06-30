import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/shared/dtos/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Get()
  public getAll() {
    return this.userService.getAll();
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
