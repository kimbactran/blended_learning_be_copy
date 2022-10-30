/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationTagToClassroom1667074779438
    implements MigrationInterface
{
    name = 'updateRelationTagToClassroom1667074779438';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "post_tag" DROP CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_classroom" DROP CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6"',
        );
        await queryRunner.query('ALTER TABLE "tag" ADD "classroom_id" uuid');
        await queryRunner.query(
            'ALTER TABLE "tag" ADD CONSTRAINT "FK_fcbe473e67f047c2c021065f285" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
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
            'ALTER TABLE "tag" DROP CONSTRAINT "FK_fcbe473e67f047c2c021065f285"',
        );
        await queryRunner.query('ALTER TABLE "tag" DROP COLUMN "classroom_id"');
        await queryRunner.query(
            'ALTER TABLE "user_classroom" ADD CONSTRAINT "FK_61de1e38a3cdde55ba55d61faa6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "post_tag" ADD CONSTRAINT "FK_d2fd5340bb68556fe93650fedc1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
    }
}
