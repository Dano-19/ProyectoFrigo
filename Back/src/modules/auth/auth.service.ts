import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    private readonly mailerService: MailerService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      throw new HttpException('Password inválido', 401);
    }

    const payload = { email: user.email, role: user.role, id: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }

  /**
   * ✅ Recuperar contraseña por correo (⚠️ DEMO)
   */
  async recuperarContraseña(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Genera un token temporal válido por 15 minutos
    const resetToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '15m' }
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperación de contraseña - Frigoservicios',
      html: `
        <h2>Hola 👋</h2>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="http://localhost:4200/change-password?token=${resetToken}">
          Cambiar Contraseña
        </a>
        <p>Este enlace expirará en 15 minutos.</p>
        <hr />
        <p>Equipo de Frigoservicios</p>
      `,
    });
  }

  /**
   * ✅ Cambiar contraseña usando un token JWT válido
   */
  async changePasswordWithToken(token: string, newPassword: string) {
    try {
      const payload: any = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({ where: { id: payload.id } });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado con ese token');
      }

      const hashed = await hash(newPassword, 10);
      await this.userRepository.update(user.id, { password: hashed });

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
