import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("category-expense")
export class CategoryEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;
}
