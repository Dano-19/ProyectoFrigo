import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateFormularioDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: string;   // has de recibirlo como “YYYY-MM-DD” en el body

  @IsOptional()
  @IsString()
  horaIngreso?: string;

  @IsOptional()
  @IsString()
  horaSalida?: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  marca: string;

  @IsNotEmpty()
  @IsString()
  modelo: string;

  @IsNotEmpty()
  @IsString()
  serie: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  capacidad: string;

  @IsNotEmpty()
  @IsString()
  refrig: string;

  @IsNotEmpty()
  @IsString()
  psi: string;

  @IsNotEmpty()
  @IsString()
  volts: string;

  @IsNotEmpty()
  @IsString()
  amp: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  materiales: string;

  @IsOptional()
  @IsString()
  recomendado: string;
}
