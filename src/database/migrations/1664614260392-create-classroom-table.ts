import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClassroomTable1664614260392 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "classroom" (
              "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
              "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
              "title"         character varying NOT NULL,
              "resources"     character varying,
              CONSTRAINT      "REL_c6656002fd9f4b2fae77502f0e784fa2" UNIQUE ("id"),
              CONSTRAINT      "PK_f6cef403469a4983bfefb6bb153b8bf9" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "user_classroom" (
              user_id         uuid references "user"("id"),
              classroom_id    uuid references "classroom"("id"),
              CONSTRAINT      "REL_43b800eac0cf4631bd40062fd88b5bfb" PRIMARY KEY ("user_id", "classroom_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "classroom"
        `);

        await queryRunner.query(`
            DROP TABLE "user_classroom"
        `);
    }
}
