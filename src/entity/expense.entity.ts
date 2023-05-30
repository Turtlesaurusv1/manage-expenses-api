import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "./common.entity";
import { CategoryEntities } from "./category.entity";

@Entity('expenses')
export class ExpensesEntities extends CommonEntity {
    @Column()
    title: string;
  
    @Column({type:"timestamptz" , nullable:true})
    expenseDate: Date;


    @ManyToOne(() => CategoryEntities, (ac) => ac.id)
    category: CategoryEntities;

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0.0,
        nullable: false,
    })
    amount: number

}