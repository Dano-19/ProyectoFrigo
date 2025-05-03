import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class RecoveryCode extends Model<RecoveryCode> {
  @Column
  email: string;  // Correo electrónico del usuario que solicita el código

  @Column
  code: string;  // El código de recuperación generado

  @Column
  expiration: Date;  // Fecha de expiración del código de recuperación

  constructor(email: string, code: string, expiration: Date) {
    super();
    this.email = email;
    this.code = code;
    this.expiration = expiration;
  }
}
