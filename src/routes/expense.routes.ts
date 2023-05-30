import { ExpensesController } from "../controller/expenses.controller";

export const expenseRoutes = [
  {
    method: "post",
    route: "/expense",
    controller: ExpensesController,
    action: "createExpense",
  },
  {
    method: "get",
    route: "/expense",
    controller: ExpensesController,
    action: "findAllExpense",
  },
  {
    method: "get",
    route: "/expense/:id",
    controller: ExpensesController,
    action: "getOneExpense",
  },
  {
    method: "patch",
    route: "/expense/:id",
    controller: ExpensesController,
    action: "updateExpense",
  },
  {
    method: "delete",
    route: "/expense/bluk",
    controller: ExpensesController,
    action: "bulkDelete",
  },
  {
    method: "delete",
    route: "/expense/:id",
    controller: ExpensesController,
    action: "deleteOneId",
  },
];
