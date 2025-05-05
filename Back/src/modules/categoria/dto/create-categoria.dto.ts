export class CreateCategoriaDto {
    fecha: Date;  // Se espera que sea un string, que luego convertimos a Date
    area: string;
    marca: string;
    modelo: string;
    tipo: string;
    capacidad:string;
    refrig:string;
    psi:string;
    volts:string;
    amp:string;
    descripcion: string;
    cantidad: number;  // Se espera que sea un string para poder convertirlo a number
    materiales: string;
    recomendacion: string;
  }
