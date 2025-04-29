import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userObj: RegisterAuthDto) {
    return await this.authService.funRegister(userObj);
  }

  @Post('login')
  async login(@Body() credenciales: LoginAuthDto) {
    return await this.authService.login(credenciales);
  }

  @Post('recuperar')
  async recuperar(@Body('email') email: string) {
    await this.authService.recuperarContraseña(email);
    return { message: 'Correo de recuperación enviado correctamente' };
  }
}
