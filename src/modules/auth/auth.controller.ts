import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SiginDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() siginDto: SiginDto) {
    return this.authService.signin(siginDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
