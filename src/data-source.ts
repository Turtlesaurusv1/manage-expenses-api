import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { CategoryEntities } from "./entity/category.entity";
import { ExpensesEntities } from "./entity/expense.entity";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.host,
  port: Number(process.env.port),
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  synchronize: true,
  logging: false,
  entities: [User,CategoryEntities,ExpensesEntities],
  migrations: [],
  subscribers: [],
});
