import {
  Injectable,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Usuario } from 'modules/usuario/entities/usuario.entity';
import { hash, compare } from 'bcryptjs';
import { randomInt } from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  // ✅ Registro de usuario
  async funRegister(dto: RegisterAuthDto) {
    console.log('📥 Datos recibidos para registro:', dto);

    const hashedPassword = await hash(dto.password, 12);
    const userToSave = { ...dto, password: hashedPassword, rol: { id_rol: 1 } };

    try {
      const userCreated = await this.userRepository.save(userToSave);
      console.log('✅ Usuario registrado exitosamente:', userCreated);
      return userCreated;
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error);
      throw new HttpException('Error al registrar el usuario', 500);
    }
  }

  // ✅ Login con JWT (con relación rol cargada)
  async login(dto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: ['rol'], // ✅ cargar relación con tabla Rol
    });

    if (!user) {
      throw new HttpException('Debes registrarte para poder ingresar', 404);
    }

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Password inválido', 401);
    }

    const payload = {
      email: user.email,
      role: user.rol?.nombre_rol,
      id: user.cedula,
    };
    const token = await this.jwtService.signAsync(payload);

    console.log('✅ Login exitoso. Usuario con rol:', user.rol?.nombre_rol);

    return {
      user: {
        cedula: user.cedula,
        nombre: user.nombre,
        correo: user.email,
        rol: user.rol?.nombre_rol || 'client',
      },
      token,
    };
  }

  // ✅ Enviar código de recuperación por email
  async enviarCodigo(email: string): Promise<string> {
    const usuario = await this.userRepository.findOneBy({ email });
    if (!usuario) throw new NotFoundException('email no registrado');

    const codigo = randomInt(100000, 999999).toString();
    const expira = new Date(Date.now() + 10 * 60000); // 10 minutos

    usuario.codigo_recuperacion = codigo;
    usuario.codigo_expira = expira;
    await this.userRepository.save(usuario);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Frigo App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Código de recuperación de contraseña',
      html: `<b>Tu código es: ${codigo}</b>`,
    });

    return 'Código enviado al email';
  }

  // ✅ Cambiar la contraseña con token
  async changePasswordWithToken(token: string, newPassword: string): Promise<void> {
    try {
      const payload: any = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({ where: { cedula: payload.cedula } });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const hashed = await hash(newPassword, 12);
      await this.userRepository.update(user.cedula, { password: hashed });
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  // ✅ Verificar código de recuperación
  async verificarCodigo(email: string, codigo: string): Promise<boolean> {
    const usuario = await this.userRepository.findOneBy({ email });
    if (!usuario || usuario.codigo_recuperacion !== codigo) return false;
    if (new Date() > usuario.codigo_expira) return false;
    return true;
  }

  // ✅ Obtener todos los usuarios registrados (con roles)
  async listarUsuarios(): Promise<any[]> {
    const usuarios = await this.userRepository.find({ relations: ['rol'] });

    const resultado = usuarios.map((u) => ({
      cedula: u.cedula,
      nombre: u.nombre,
      correo: u.email,
      telefono: u.telefono,
      rol: u.rol?.nombre_rol || 'sin-rol',
    }));

    console.log('📋 Usuarios registrados con roles:', resultado);
    return resultado;
  }
}
