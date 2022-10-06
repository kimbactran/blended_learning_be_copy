/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentTable1665031512270 implements MigrationInterface {
    name = 'addCommentTable1665031512270';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'CREATE TABLE "comment" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "parent_id" character varying, "is_delete" boolean NOT NULL DEFAULT false, "user_id" uuid, "post_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
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
            'ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"',
        );
        await queryRunner.query('DROP TABLE "comment"');
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }
}
