/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDeleteCascade1669544949467 implements MigrationInterface {
    name = 'updateDeleteCascade1669544949467';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "tag" DROP CONSTRAINT "FK_d0be05b78e89aff4791e6189f77"',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" DROP CONSTRAINT "FK_fcbe473e67f047c2c021065f285"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP CONSTRAINT "FK_8c9d3207f9bfb82b1958f780ea1"',
        );
        await queryRunner.query(
            'ALTER TABLE "post" DROP CONSTRAINT "FK_15b4aeefdbb4b2cb22777e54ed0"',
        );
        await queryRunner.query(
            'ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP CONSTRAINT "FK_4064f0a28573a840711aa44c1fb"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" DROP CONSTRAINT "FK_80c032387c85e17715355304fec"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" DROP CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" ADD CONSTRAINT "FK_d0be05b78e89aff4791e6189f77" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" ADD CONSTRAINT "FK_fcbe473e67f047c2c021065f285" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD CONSTRAINT "FK_8c9d3207f9bfb82b1958f780ea1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post" ADD CONSTRAINT "FK_15b4aeefdbb4b2cb22777e54ed0" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD CONSTRAINT "FK_4064f0a28573a840711aa44c1fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" ADD CONSTRAINT "FK_80c032387c85e17715355304fec" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" ADD CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE',
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
            'ALTER TABLE "post_tag" DROP CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" DROP CONSTRAINT "FK_80c032387c85e17715355304fec"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" DROP CONSTRAINT "FK_4064f0a28573a840711aa44c1fb"',
        );
        await queryRunner.query(
            'ALTER TABLE "post" DROP CONSTRAINT "FK_15b4aeefdbb4b2cb22777e54ed0"',
        );
        await queryRunner.query(
            'ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" DROP CONSTRAINT "FK_8c9d3207f9bfb82b1958f780ea1"',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" DROP CONSTRAINT "FK_fcbe473e67f047c2c021065f285"',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" DROP CONSTRAINT "FK_d0be05b78e89aff4791e6189f77"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" ADD CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" ADD CONSTRAINT "FK_80c032387c85e17715355304fec" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "comment_stat" ADD CONSTRAINT "FK_4064f0a28573a840711aa44c1fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post" ADD CONSTRAINT "FK_15b4aeefdbb4b2cb22777e54ed0" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_stat" ADD CONSTRAINT "FK_8c9d3207f9bfb82b1958f780ea1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" ADD CONSTRAINT "FK_fcbe473e67f047c2c021065f285" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "tag" ADD CONSTRAINT "FK_d0be05b78e89aff4791e6189f77" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }
}
