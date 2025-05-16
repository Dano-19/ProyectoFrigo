import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1747362013269 implements MigrationInterface {
    name = 'CreateTable1747362013269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id_cliente" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "telefono" character varying(20) NOT NULL, "direccion" character varying(200) NOT NULL, "correo" character varying(100) NOT NULL, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1b10c7d5f7526810e1c70fb9656" UNIQUE ("correo"), CONSTRAINT "PK_4b7c4b981b60b5c6b1d04c84a54" PRIMARY KEY ("id_cliente"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('client', 'technical', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(225) NOT NULL, "password" character varying(200) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'client', "reporte_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "correo" character varying(100) NOT NULL, "asunto" character varying(255) NOT NULL, "mensaje" text NOT NULL, "status" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assignedToId" integer NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Formulario" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP, "horaIngreso" TIME, "horaSalida" TIME, "area" text, "marca" character varying, "modelo" character varying(50) NOT NULL, "tipo" character varying(50) NOT NULL, "descripcion" text, "cantidad" numeric(5,2) NOT NULL, "materiales" text, "acciones" character varying(50), "ticket_id" uuid, CONSTRAINT "PK_378d55ddddc1da1f58f22b45317" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Reporte" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "correo" character varying NOT NULL, "telefono" character varying NOT NULL, "direccion" character varying, "descripcion" character varying NOT NULL, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), "client_id" integer, "formulario_id" integer, "ticket_id" uuid, CONSTRAINT "REL_5d30c05154a5aa3ac2f49cc161" UNIQUE ("formulario_id"), CONSTRAINT "PK_bd837e46d206a980d9995790c87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_reporte_formulario" ON "Reporte" ("formulario_id") `);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "descripcion" text, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "detalle" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_user" ("rolesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c9667a1fe5b74f7427a3ab50025" PRIMARY KEY ("rolesId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb446d431a1abb9801e6ade445" ON "role_user" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a23ceb75c7511d0523c4aaf49" ON "role_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4a7c50bbbbcb5998f6b5389c5ba" FOREIGN KEY ("reporte_id") REFERENCES "Reporte"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_7712f291901ceeb504b329df623" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Formulario" ADD CONSTRAINT "FK_3c2e7a9e485e0ea59532a2d3822" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reporte" ADD CONSTRAINT "FK_d7b93160f58045c7aaa59559afe" FOREIGN KEY ("client_id") REFERENCES "clientes"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reporte" ADD CONSTRAINT "FK_5d30c05154a5aa3ac2f49cc1615" FOREIGN KEY ("formulario_id") REFERENCES "Formulario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reporte" ADD CONSTRAINT "FK_24f57d7bb0ccbc33afa8556c105" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_eb446d431a1abb9801e6ade4456" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_eb446d431a1abb9801e6ade4456"`);
        await queryRunner.query(`ALTER TABLE "Reporte" DROP CONSTRAINT "FK_24f57d7bb0ccbc33afa8556c105"`);
        await queryRunner.query(`ALTER TABLE "Reporte" DROP CONSTRAINT "FK_5d30c05154a5aa3ac2f49cc1615"`);
        await queryRunner.query(`ALTER TABLE "Reporte" DROP CONSTRAINT "FK_d7b93160f58045c7aaa59559afe"`);
        await queryRunner.query(`ALTER TABLE "Formulario" DROP CONSTRAINT "FK_3c2e7a9e485e0ea59532a2d3822"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_7712f291901ceeb504b329df623"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4a7c50bbbbcb5998f6b5389c5ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a23ceb75c7511d0523c4aaf49"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb446d431a1abb9801e6ade445"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP INDEX "public"."UQ_reporte_formulario"`);
        await queryRunner.query(`DROP TABLE "Reporte"`);
        await queryRunner.query(`DROP TABLE "Formulario"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
    }

}
