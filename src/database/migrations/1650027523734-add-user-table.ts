import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1650027523734 implements MigrationInterface {
    name = 'AddUserTable1650027523734';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "created_at"        TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at"        TIMESTAMP NOT NULL DEFAULT now(),
                "role"              "public"."users_role_enum" NOT NULL DEFAULT 'USER',
                "address"           character varying NOT NULL,
                "username"          character varying NOT NULL,
                "password"          character varying,
                "logo"              character varying,
                "background_banner" character varying NOT NULL,
                "bio"               character varying,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("address")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
    }
}
