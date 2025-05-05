import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodasLasTablas1746423059695 implements MigrationInterface {
    name = 'CreateTodasLasTablas1746423059695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "capacidad"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "refrig"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "psi"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "volts"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "amp"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "recomendacion"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "acciones" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "acciones"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "recomendacion" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "amp" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "volts" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "psi" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "refrig" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "capacidad" character varying(50) NOT NULL`);
    }

}
