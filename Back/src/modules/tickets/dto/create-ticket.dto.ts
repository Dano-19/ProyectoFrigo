import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe ser válido' })
  correo: string;

  @IsNotEmpty({ message: 'El asunto es obligatorio' })
  asunto: string;

  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @MinLength(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
  mensaje: string;
}
