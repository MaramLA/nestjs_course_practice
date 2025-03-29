import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1743285013304 implements MigrationInterface {
    name = 'FirstMigration1743285013304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."upload_document_type_enum" AS ENUM('image')`);
        await queryRunner.query(`CREATE TABLE "upload_document" ("id" SERIAL NOT NULL, "name" character varying(1024) NOT NULL, "path" character varying(1024) NOT NULL, "type" "public"."upload_document_type_enum" NOT NULL DEFAULT 'image', "mime" character varying(128) NOT NULL, "size" character varying(1024) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7c1c87518743537365f3699f2fa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "upload_document"`);
        await queryRunner.query(`DROP TYPE "public"."upload_document_type_enum"`);
    }

}
