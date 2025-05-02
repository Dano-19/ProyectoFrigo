import { IsNotEmpty } from 'class-validator';

export class CreateTecnicoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsNotEmpty()
  especializacion: string;
}
