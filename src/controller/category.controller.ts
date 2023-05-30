import { AppDataSource } from "../data-source";
import { CategoryEntities } from "../entity/category.entity";
import { NextFunction, Request, Response } from "express";
export class CategoryController {
  private categoryRepository = AppDataSource.getRepository(CategoryEntities);

  async createCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const category = await this.categoryRepository.create({
        ...request.body,
      });
      response.status(201).json(await this.categoryRepository.save(category));
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        response.status(404).send("Category not found");
        return;
      }
      const updateCategory = await this.categoryRepository.merge(category, {
        ...request.body,
      });
      await this.categoryRepository.save(updateCategory);
      response.status(200).json(updateCategory);
    } catch (error) {
      throw error;
    }
  }

  async findAllCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { name, status, page, limit, pagination } = request.query;
      const qb = await this.categoryRepository.createQueryBuilder("c");
      if (name) {
        qb.andWhere("c.name ilike :name", { name: `%${name}%` });
      }
      if (status) {
        qb.andWhere("c.status = :status", { status });
      }
      if (pagination) {
        qb.skip(page);
        qb.take(limit);
      }

      const result = await qb.getMany();
      response.status(200).json({
        data: result,
        page: page || 1,
        limit: limit || 10,
        pageCount: Math.ceil(result.length / limit) || 1,
      });
    } catch (error) {
      throw error;
    }
  }

  async getOneCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        response.status(404).send("Category not found");
        return;
      }
      response.status(200).json(category);
    } catch (error) {
      throw error;
    }
  }

  async bulkDelete(request: Request, response: Response, next: NextFunction) {
    try {
      const ids = request.body.ids;
      const result = await this.categoryRepository.softDelete(ids);
      response.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  async deleteOneId(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const findId = await this.categoryRepository.findOneBy({ id });
      if (!findId) {
        response.status(404).send("Category not found");
        return;
      }
      const result = await this.categoryRepository.softDelete(id);
      response.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }
}
