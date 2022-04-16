import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1650073972138 implements MigrationInterface {
    name = 'UpdateUserTable1650073972138';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_contact" DROP CONSTRAINT "FK_abb56b47aedf8bf738ac23b6c15"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
                RENAME COLUMN "user_id" TO "user_address"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
                RENAME CONSTRAINT "REL_abb56b47aedf8bf738ac23b6c1" TO "UQ_401e6b0e481ab9b4f00dc28b783"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
            ALTER COLUMN "user_address"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
            ADD CONSTRAINT "FK_401e6b0e481ab9b4f00dc28b783" FOREIGN KEY ("user_address") 
            REFERENCES "users"("address") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_contact" DROP CONSTRAINT "FK_401e6b0e481ab9b4f00dc28b783"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
            ALTER COLUMN "user_address" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
                RENAME CONSTRAINT "UQ_401e6b0e481ab9b4f00dc28b783" TO "REL_abb56b47aedf8bf738ac23b6c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
                RENAME COLUMN "user_address" TO "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
            ADD CONSTRAINT "FK_abb56b47aedf8bf738ac23b6c15" FOREIGN KEY ("user_id") REFERENCES "users"("address") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
}
