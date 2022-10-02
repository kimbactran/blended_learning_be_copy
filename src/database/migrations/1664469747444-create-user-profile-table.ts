import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserProfileTable1650028971952 implements MigrationInterface {
    name = 'createUserProfileTable1650028971952';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_gender" AS ENUM('MALE', 'FEMALE')
        `);

        await queryRunner.query(`
            CREATE TABLE "user_profile" (
                "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
                "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name"          character varying,
                "gender"        "public"."user_gender" NOT NULL DEFAULT 'MALE',
                "user_id"       uuid NOT NULL,
                CONSTRAINT      "REL_abb56b47aedf8bf738ac23b6c1" UNIQUE ("user_id"),
                CONSTRAINT      "PK_894dc440ade508fba6831724ec6" PRIMARY KEY ("id")
            )
        `);
        // await queryRunner.query(`
        //     ALTER TABLE "user_profile"
        //     ADD CONSTRAINT "FK_abb56b47aedf8bf738ac23b6c15" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TYPE "public"."user_gender"
        `);
        // await queryRunner.query(`
        //     ALTER TABLE "user_profile" DROP CONSTRAINT "FK_abb56b47aedf8bf738ac23b6c15"
        // `);
        await queryRunner.query(`
            DROP TABLE "user_profile"
        `);
    }
}
