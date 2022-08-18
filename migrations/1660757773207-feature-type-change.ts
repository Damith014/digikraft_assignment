import { MigrationInterface, QueryRunner } from "typeorm";

export class featureTypeChange1660757773207 implements MigrationInterface {
    name = 'featureTypeChange1660757773207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`indego\` DROP COLUMN \`features\``);
        await queryRunner.query(`ALTER TABLE \`indego\` ADD \`features\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`indego\` DROP COLUMN \`features\``);
        await queryRunner.query(`ALTER TABLE \`indego\` ADD \`features\` varchar(255) NOT NULL`);
    }

}
