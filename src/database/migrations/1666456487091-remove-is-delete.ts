/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIsDelete1666456487091 implements MigrationInterface {
    name = 'removeIsDelete1666456487091';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "post_tag" DROP CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query(
            'ALTER TABLE "comment" DROP COLUMN "is_delete"',
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
            'ALTER TABLE "comment" ADD "is_delete" boolean NOT NULL DEFAULT false',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" ADD CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
    }
}
