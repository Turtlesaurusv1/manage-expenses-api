import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity('user')
export class UserEntities extends CommonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;
}
