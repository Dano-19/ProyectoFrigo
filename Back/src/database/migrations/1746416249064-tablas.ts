import { MigrationInterface, QueryRunner } from "typeorm";

export class Tablas1746416249064 implements MigrationInterface {
    name = 'Tablas1746416249064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "clienteId"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "nombre_completo"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "dni"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "correo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "direccion" character varying`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "descripcion" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "creado_en" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "creado_en"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "direccion"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "correo"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "dni" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "nombre_completo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "clienteId" integer`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
