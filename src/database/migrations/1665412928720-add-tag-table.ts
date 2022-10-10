/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTagTable1665412928720 implements MigrationInterface {
    name = 'addTagTable1665412928720';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'CREATE TABLE "tag" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "user_id" uuid, CONSTRAINT "UQ_9dbf61b2d00d2c77d3b5ced37c6" UNIQUE ("tag"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "post_tag" ("tag_id" uuid NOT NULL, "post_id" uuid NOT NULL, CONSTRAINT "PK_c6d49aa86322a6f58c39ea25a5d" PRIMARY KEY ("tag_id", "post_id"))',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_d2fd5340bb68556fe93650fedc" ON "post_tag" ("tag_id") ',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_b5ec92f15aaa1e371f2662f681" ON "post_tag" ("post_id") ',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" ADD CONSTRAINT "FK_d0be05b78e89aff4791e6189f77" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" ADD CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" ADD CONSTRAINT "FK_b5ec92f15aaa1e371f2662f6812" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE',
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
            'ALTER TABLE "post_tag" DROP CONSTRAINT "FK_b5ec92f15aaa1e371f2662f6812"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" DROP CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1"',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" DROP CONSTRAINT "FK_d0be05b78e89aff4791e6189f77"',
        );
        await queryRunner.query(
            'DROP INDEX "public"."IDX_b5ec92f15aaa1e371f2662f681"',
        );
        await queryRunner.query(
            'DROP INDEX "public"."IDX_d2fd5340bb68556fe93650fedc"',
        );
        await queryRunner.query('DROP TABLE "post_tag"');
        await queryRunner.query('DROP TABLE "tag"');
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }
}
