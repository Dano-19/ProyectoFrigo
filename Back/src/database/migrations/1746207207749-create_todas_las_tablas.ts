import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodasLasTablas1746207207749 implements MigrationInterface {
    name = 'CreateTodasLasTablas1746207207749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "detalle"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "fecha" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "area" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Marca" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Modelo" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Tipo" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "descripcionTrabajo" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Cantidad" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Material" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "Acciones" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Acciones"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Material"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Cantidad"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "descripcionTrabajo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Tipo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Modelo"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "Marca"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "detalle" text`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "nombre" character varying(50) NOT NULL`);
    }

}
