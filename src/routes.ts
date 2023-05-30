import { categoryRoutes } from "./routes/category.routes";
import { expenseRoutes } from "./routes/expense.routes";
import { userRoutes } from "./routes/user.routes";

export const Routes = [...userRoutes, ...categoryRoutes,...expenseRoutes];
