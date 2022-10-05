/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1664968273349 implements MigrationInterface {
    name = 'initTables1664968273349';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "post_stat" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "up_vote" integer NOT NULL, "down_vote" integer NOT NULL, "is_viewed" integer NOT NULL, "user_id" uuid, "post_id" uuid, CONSTRAINT "PK_5db1ea695ebe253e49c880b3fda" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "post" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "user_id" uuid, "classroom_id" uuid, CONSTRAINT "UQ_e28aa0c4114146bfb1567bfa9ac" UNIQUE ("title"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "classroom" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "resources" character varying, CONSTRAINT "UQ_ba71a9f4e0fd35b64b4b0bdae6a" UNIQUE ("title"), CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TYPE "public"."user_profile_gender_enum" AS ENUM(\'MALE\', \'FEMALE\')',
        );
        await queryRunner.query(
            'CREATE TABLE "user_profile" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "gender" "public"."user_profile_gender_enum" NOT NULL DEFAULT \'MALE\', "user_id" uuid NOT NULL, CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            "CREATE TYPE \"public\".\"user_role_enum\" AS ENUM('ADMIN', 'TEACHER', 'STUDENT')",
        );
        await queryRunner.query(
            'CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."user_role_enum" NOT NULL DEFAULT \'STUDENT\', "email" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "user_classroom" ("classroom_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_f9aa4ae5686c582139947c4c8dc" PRIMARY KEY ("classroom_id", "user_id"))',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_6e4725f2ce45b0d4d319ca08d9" ON "user_classroom" ("classroom_id") ',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_61de1e38a3cdde55ba55d61faa" ON "user_classroom" ("user_id") ',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD CONSTRAINT "FK_8c9d3207f9bfb82b1958f780ea1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD CONSTRAINT "FK_7718fbdca652b4d554cccc83256" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post" ADD CONSTRAINT "FK_15b4aeefdbb4b2cb22777e54ed0" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_6e4725f2ce45b0d4d319ca08d9d" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_6e4725f2ce45b0d4d319ca08d9d"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"',
        );
        await queryRunner.query(
            'ALTER TABLE "post" DROP CONSTRAINT "FK_15b4aeefdbb4b2cb22777e54ed0"',
        );
        await queryRunner.query(
            'ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP CONSTRAINT "FK_7718fbdca652b4d554cccc83256"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP CONSTRAINT "FK_8c9d3207f9bfb82b1958f780ea1"',
        );
        await queryRunner.query(
            'DROP INDEX "public"."IDX_61de1e38a3cdde55ba55d61faa"',
        );
        await queryRunner.query(
            'DROP INDEX "public"."IDX_6e4725f2ce45b0d4d319ca08d9"',
        );
        await queryRunner.query('DROP TABLE "user_classroom"');
        await queryRunner.query('DROP TABLE "user"');
        await queryRunner.query('DROP TYPE "public"."user_role_enum"');
        await queryRunner.query('DROP TABLE "user_profile"');
        await queryRunner.query(
            'DROP TYPE "public"."user_profile_gender_enum"',
        );
        await queryRunner.query('DROP TABLE "classroom"');
        await queryRunner.query('DROP TABLE "post"');
        await queryRunner.query('DROP TABLE "post_stat"');
    }
}
