import { MigrationInterface, QueryRunner } from "typeorm";

export class Tablas1746234513296 implements MigrationInterface {
    name = 'Tablas1746234513296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`ALTER TABLE "categoria" RENAME COLUMN "fecha" TO "nombre"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" ALTER COLUMN "precio" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "productos" ALTER COLUMN "stock" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "productos" ALTER COLUMN "categoriaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`ALTER TABLE "productos" ALTER COLUMN "categoriaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" ALTER COLUMN "stock" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "productos" ALTER COLUMN "precio" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "nombre" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "nombre" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "estado" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "image" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "categoria" RENAME COLUMN "nombre" TO "fecha"`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
