import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriasTable1746431770301 implements MigrationInterface {
    name = 'CategoriasTable1746431770301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Marca"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Modelo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Tipo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "descripcionTrabajo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Cantidad"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Material"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Acciones"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "fecha" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "marca" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "modelo" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "tipo" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "descripcion" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "cantidad" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "materiales" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "acciones" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "acciones"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "materiales"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "cantidad"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "tipo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "modelo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "marca"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Acciones" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Material" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Cantidad" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "descripcionTrabajo" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Tipo" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Modelo" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Marca" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "nombre" character varying NOT NULL`);
    }

}
