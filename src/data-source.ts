import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { CategoryEntities } from "./entity/category.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "5504",
  database: "manage-expense",
  synchronize: true,
  logging: false,
  entities: [User,CategoryEntities],
  migrations: [],
  subscribers: [],
});
