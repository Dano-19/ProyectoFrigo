import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('recuperar')
  recuperar(@Body('email') email: string) {
    return this.authService.enviarCodigo(email);
  }

  @Post('verificar-codigo')
  verificar(@Body() dto: { email: string; codigo: string }) {
    return this.authService.verificarCodigo(dto.email, dto.codigo);
  }

  @Post('reset-password')
  resetear(@Body() dto: { email: string; nuevaClave: string }) {
    return this.authService.changePasswordWithToken(dto.email, dto.nuevaClave);
  }


  @Public()
   @Post('register')
  async register(@Body() dto: RegisterAuthDto) {
    console.log('Datos recibidos:', dto); // ✅ Verifica en consola
    return this.authService.funRegister(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }


  @Public()
@Post('listar-usuarios')
listarUsuarios() {
  return this.authService.listarUsuarios();
}
}