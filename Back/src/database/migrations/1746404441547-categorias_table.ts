import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriasTable1746404441547 implements MigrationInterface {
    name = 'CategoriasTable1746404441547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('client', 'technical', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(225) NOT NULL, "password" character varying(200) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'client', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "detalle" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "area" text, "Marca" character varying(50) NOT NULL, "Modelo" character varying(50) NOT NULL, "Tipo" character varying(50) NOT NULL, "descripcionTrabajo" text, "Cantidad" numeric(5,2) NOT NULL, "Material" text, "Acciones" character varying(50) NOT NULL, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "descripcion" text, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido_producto" ("id" SERIAL NOT NULL, "pedidoId" integer NOT NULL, "productoId" integer NOT NULL, "cantidad" integer NOT NULL, CONSTRAINT "PK_97f69aaf286bdd82afbd487e4d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "fecha" character varying NOT NULL, "estado" integer NOT NULL, "observaciones" character varying NOT NULL, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "correo" character varying NOT NULL, "telefono" character varying NOT NULL, "direccion" character varying, "descripcion" character varying NOT NULL, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_user" ("rolesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c9667a1fe5b74f7427a3ab50025" PRIMARY KEY ("rolesId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb446d431a1abb9801e6ade445" ON "role_user" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a23ceb75c7511d0523c4aaf49" ON "role_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" ADD CONSTRAINT "FK_6085b3aa6d0d1aec5985d3cb2ce" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" ADD CONSTRAINT "FK_da007c96a1af3dbf6a925bf6581" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_eb446d431a1abb9801e6ade4456" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_eb446d431a1abb9801e6ade4456"`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" DROP CONSTRAINT "FK_da007c96a1af3dbf6a925bf6581"`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" DROP CONSTRAINT "FK_6085b3aa6d0d1aec5985d3cb2ce"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a23ceb75c7511d0523c4aaf49"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb446d431a1abb9801e6ade445"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "pedido_producto"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
