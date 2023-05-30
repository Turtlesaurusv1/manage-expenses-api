import { CategoryController } from "../controller/category.controller";
export const categoryRoutes = [
  {
    method: "post",
    route: "/category",
    controller: CategoryController,
    action: "createCategory",
  },
  {
    method: "get",
    route: "/category",
    controller: CategoryController,
    action: "findAllCategory",
  },
  {
    method: "get",
    route: "/category/:id",
    controller: CategoryController,
    action: "getOneCategory",
  },
  {
    method: "patch",
    route: "/category/:id",
    controller: CategoryController,
    action: "updateCategory",
  },
  {
    method: "delete",
    route: "/category/bluk",
    controller: CategoryController,
    action: "bulkDelete",
  },
  {
    method: "delete",
    route: "/category/:id",
    controller: CategoryController,
    action: "deleteOneId",
  },
];
