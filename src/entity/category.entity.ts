import { Entity, Column } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity("category-expense")
export class CategoryEntities extends CommonEntity {
  @Column()
  name: string;

  @Column()
  status: boolean;
}
