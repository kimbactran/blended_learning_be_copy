import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1664790633313 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "post" (
          "created_at"        TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at"        TIMESTAMP NOT NULL DEFAULT now(),
          "is_deleted"        boolean NOT NULL DEFAULT false,
          "id"                uuid NOT NULL DEFAULT uuid_generate_v4(),
          "title"             character varying NOT NULL,
          "content"           character varying NOT NULL,
          "user_id"           uuid NOT NULL,
          "classroom_id"      uuid NOT NULL,
          CONSTRAINT "UQ_8fd66b92434343c3865050622cd178a6" UNIQUE ("user_id", "classroom_id"),
          CONSTRAINT "PK_b601a2e10b464ca2b4bb7856f31071ca" PRIMARY KEY ("id")
        )
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE "post"
        `);
    }
}
