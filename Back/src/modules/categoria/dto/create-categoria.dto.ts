export class CreateCategoriaDto {
    Fecha: string;  // Se espera que sea un string, que luego convertimos a Date
    area: string;
    Marca: string;
    Modelo: string;
    Tipo: string;
    DescripciónTrabajo: string;
    Cantidad: number;  // Se espera que sea un string para poder convertirlo a number
    Materiales: string;
    Acciones: string;
  }
