import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Indego extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "longtext" })
  features: string;

  @Column()
  timestamp: Date;

  @Column()
  kioskId: number;
}
