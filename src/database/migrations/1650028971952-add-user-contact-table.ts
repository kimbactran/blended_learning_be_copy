import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserContactTable1650028971952 implements MigrationInterface {
    name = 'AddUserContactTable1650028971952';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_contact" (
                "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
                "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
                "twitter"       character varying NOT NULL,
                "facebook"      character varying NOT NULL,
                "email"         character varying NOT NULL,
                "behance"       character varying NOT NULL,
                "user_id"       character varying,
                CONSTRAINT      "REL_abb56b47aedf8bf738ac23b6c1" UNIQUE ("user_id"),
                CONSTRAINT      "PK_894dc440ade508fba6831724ec6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_contact"
            ADD CONSTRAINT "FK_abb56b47aedf8bf738ac23b6c15" FOREIGN KEY ("user_id") REFERENCES "users"("address") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_contact" DROP CONSTRAINT "FK_abb56b47aedf8bf738ac23b6c15"
        `);
        await queryRunner.query(`
            DROP TABLE "user_contact"
        `);
    }
}
