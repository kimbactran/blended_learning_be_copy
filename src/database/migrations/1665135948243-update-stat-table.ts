/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStatTable1665135948243 implements MigrationInterface {
    name = 'updateStatTable1665135948243';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP COLUMN "up_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP COLUMN "down_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP COLUMN "up_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP COLUMN "down_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD "is_up_vote" boolean NOT NULL DEFAULT false',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD "is_down_vote" boolean NOT NULL DEFAULT false',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD "is_up_vote" boolean NOT NULL DEFAULT false',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD "is_down_vote" boolean NOT NULL DEFAULT false',
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
            'ALTER TABLE "post_stat" DROP COLUMN "is_down_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP COLUMN "is_up_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP COLUMN "is_down_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP COLUMN "is_up_vote"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD "down_vote" integer NOT NULL DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD "up_vote" integer NOT NULL DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD "down_vote" integer NOT NULL DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD "up_vote" integer NOT NULL DEFAULT \'0\'',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }
}
