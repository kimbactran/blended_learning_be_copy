import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1650106821117 implements MigrationInterface {
    name = 'UpdateUserTable1650106821117';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "background_banner" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "background_banner"
            SET NOT NULL
        `);
    }
}
