import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/shared/dtos/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    //
  }

  @Post('register')
  public register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
