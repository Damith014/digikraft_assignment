import { MigrationInterface, QueryRunner } from "typeorm";

export class initGen1660755919326 implements MigrationInterface {
    name = 'initGen1660755919326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`indego\` (\`id\` varchar(36) NOT NULL, \`features\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`kioskId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`indego\``);
    }

}
