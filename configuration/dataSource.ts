import "reflect-metadata";
import { DataSource } from "typeorm";
import { initGen1660755919326 } from "../migrations/1660755919326-init-gen";
import { featureTypeChange1660757773207 } from "../migrations/1660757773207-feature-type-change";

// Entities
import { Indego } from "../modules/indego/entity/indego.entity";

export const appDataSource = new DataSource({
  type: "mysql",
  username: "root",
  password: "password",
  database: "digikraftdb",
  host: "localhost",
  entities: [Indego],
  timezone: "Asia/Colombo",
  migrations: [initGen1660755919326, featureTypeChange1660757773207],
});
