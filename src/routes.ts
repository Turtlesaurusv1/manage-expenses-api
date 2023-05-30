import { categoryRoutes } from "./routes/category.routes";
import { userRoutes } from "./routes/user.routes";

export const Routes = [...userRoutes, ...categoryRoutes];
