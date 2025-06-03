export class UpdateReporteDto {
  readonly hora_entrada?: string;
  readonly hora_salida?: string;
  readonly estado: string;
  readonly area?: string;
  readonly marca?: string;
  readonly modelo?: string;
  readonly serie?: string;
  readonly tipo?: string;
  readonly capacidad?: string;
  readonly volt?: string;
  readonly amp?: string;
  readonly cantidad?: number;
  readonly descripcion?: string;
  readonly recomendacion?: string;
  readonly id_ticket?: number;
}