import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailerService: MailerService
  ) {}

  /**
   * ✅ Registrar un nuevo usuario con contraseña encriptada
   */
  async funRegister(objUser: RegisterAuthDto) {
    const hashedPassword = await hash(objUser.password, 12);
    const newUser = { ...objUser, password: hashedPassword };
    return this.userRepository.save(newUser);
  }

  /**
   * ✅ Iniciar sesión y devolver token JWT
   */
  async login(credenciales: LoginAuthDto) {
    const { email, password } = credenciales;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Debes registrarte para poder ingresar', 404);
    }

    const verificarPass = await compare(password, user.password);
    if (!verificarPass) {
      throw new HttpException('Password invalido', 401);
    }

    /*const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);*/
    const payload = { email: user.email, role: user.role, id: user.id };
    const token = await this.jwtService.signAsync(payload)

    return { user, token };
  }

  /**
   * ✅ Recuperar contraseña por correo (⚠️ solo para pruebas)
   */
  async recuperarContraseña(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperación de contraseña - Frigoservicios',
      html: `
        <h2>Hola 👋</h2>
        <p>Tu contraseña encriptada es: <strong>${user.password}</strong></p>
        <p>⚠️ Este es un correo de prueba. En producción, deberías enviar un enlace para restablecer la contraseña.</p>
        <hr />
        <p>Equipo de Frigoservicios</p>
      `,
    });
  }
}
