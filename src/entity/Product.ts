import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("produto")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  descricao!: string;

  @Column()
  tags!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
