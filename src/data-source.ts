import "reflect-metadata";
import { DataSource } from "typeorm";
import { CategoryEntities } from "./entity/category.entity";
import { ExpensesEntities } from "./entity/expense.entity";
import { UserEntities } from "./entity/user.entitiy";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.db_host,
  port: Number(process.env.db_port),
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  synchronize: true,
  logging: false,
  entities: [UserEntities,CategoryEntities,ExpensesEntities],
  migrations: [],
  subscribers: [],
});
