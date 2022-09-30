import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1664469385005 implements MigrationInterface {
    name = 'createUserTable1664469385005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TYPE "public"."users_role_enum" as ENUM ('ADMIN', 'TEACHER', 'STUDENT')
        `);
        await queryRunner.query(`
          CREATE TABLE "users" (
            "created_at"        TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at"        TIMESTAMP NOT NULL DEFAULT now(),
            "id"                uuid NOT NULL DEFAULT uuid_generate_v4(),
            "role"              "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT',
            "email"             character varying NOT NULL,
            "password"          character varying NOT NULL,
            CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("email"),
            CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("id")
          )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}
