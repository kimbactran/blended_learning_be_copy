/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentStatTable1665032814551 implements MigrationInterface {
    name = 'addCommentStatTable1665032814551';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'CREATE TABLE "comment_stat" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "up_vote" integer NOT NULL DEFAULT \'0\', "down_vote" integer NOT NULL DEFAULT \'0\', "user_id" uuid, "comment_id" uuid, CONSTRAINT "PK_cd37d592d6224a409426fb5c065" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ALTER COLUMN "up_vote" SET DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ALTER COLUMN "down_vote" SET DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ALTER COLUMN "is_viewed" SET DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD CONSTRAINT "FK_4064f0a28573a840711aa44c1fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD CONSTRAINT "FK_ce3b6ff6605fe1f6686f32c11d9" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
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
            'ALTER TABLE "comment_stat" DROP CONSTRAINT "FK_ce3b6ff6605fe1f6686f32c11d9"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP CONSTRAINT "FK_4064f0a28573a840711aa44c1fb"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ALTER COLUMN "is_viewed" DROP DEFAULT',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ALTER COLUMN "down_vote" DROP DEFAULT',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ALTER COLUMN "up_vote" DROP DEFAULT',
        );
        await queryRunner.query('DROP TABLE "comment_stat"');
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }
}
