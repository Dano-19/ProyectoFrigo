export class UpdatePedidoDto {
  readonly detalle?: string;
  readonly ciudad?: string;
  readonly callePrincipal?: string;
  readonly calleSecundaria?: string;
  readonly codigo_postal?: number;
  readonly cedula_cliente?: number;
}