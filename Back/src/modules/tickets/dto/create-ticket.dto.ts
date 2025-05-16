
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsUUID, IsOptional, IsInt } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  asunto: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  
  @Type(() => Number)
  @IsInt({ message: 'assignedToId debe ser un entero' })
  assignedToId: number;  // ya no opcional
}
