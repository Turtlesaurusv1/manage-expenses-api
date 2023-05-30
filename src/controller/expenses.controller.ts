import { AppDataSource } from "../data-source";
import { CategoryEntities } from "../entity/category.entity";
import { ExpensesEntities } from "../entity/expense.entity";
import { Request, Response, NextFunction } from "express";

export class ExpensesController {
  private expenseRepository = AppDataSource.getRepository(ExpensesEntities);
  private categoryRepository = AppDataSource.getRepository(CategoryEntities);

  async createExpense(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { category } = request.body;
      const findCategory = await this.categoryRepository.findOne({
        where: {
          id: category,
        },
      });
      if (!findCategory) {
        response.status(404).send("Category not found");
        return;
      }
      const expense = await this.expenseRepository.create({
        ...request.body,
        category: findCategory,
      });
      response.status(201).json(await this.expenseRepository.save(expense));
    } catch (error) {
      throw error;
    }
  }

  async findAllExpense(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { title, category, startDate, endDate, page, limit, pagination } =
      request.query;
    const qb = this.expenseRepository
      .createQueryBuilder("e")
      .leftJoinAndSelect("e.category", "c");
    if (title) {
      qb.andWhere("e.title ilike :title", { title: `%${title}%` });
    }
    if (startDate && endDate) {
      qb.andWhere("e.expenseDate Between :startDate and :endDate", {
        startDate: startDate,
        endDate: endDate,
      });
    }
    if (category) {
      qb.where(`c.id = :cid`, { cid: category });
    }
    if (pagination) {
      qb.skip(page);
      qb.take(limit);
    }
    const result = await qb.getMany();
    const getSummary = await this.summaryExpense(
      title,
      startDate,
      endDate,
      category
    );
    response.status(200).json({
      data: result,
      summary: getSummary,
      page: page || 1,
      limit: limit || 10,
      pageCount: Math.ceil(result.length / limit) || 1,
    });
  }

  async getOneExpense(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
      const expense = await this.expenseRepository.findOne({
        where:{
            id:id
        },relations:['category']
      })
      if (!expense) {
        response.status(404).send("expense not found");
        return;
      }
      response.status(200).json(expense);
    } catch (error) {
      throw error;
    }
  }

  async updateExpense(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(request.params.id);
      const {category} = request.body
      //findExpense
      const expense = await this.expenseRepository.findOneBy({ id });
      if (!expense) {
        response.status(404).send("Expense not found");
        return;
      }
      //findCate
      const findCategory = await this.categoryRepository.findOne({
        where: {
          id: category,
        },
      });
      if (!findCategory) {
        response.status(404).send("Category not found");
        return;
      }
      const updateExpense = await this.expenseRepository.merge(expense, {
        ...request.body,
        category:findCategory
      });
      await this.expenseRepository.save(updateExpense);
      response.status(200).json(updateExpense);
    } catch (error) {
      throw error;
    }
  }

  async bulkDelete(request: Request, response: Response, next: NextFunction) {
    try {
      const ids = request.body.ids;
      const result = await this.expenseRepository.softDelete(ids);
      response.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  async deleteOneId(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const findId = await this.expenseRepository.findOneBy({ id });
      if (!findId) {
        response.status(404).send("Expense not found");
        return;
      }
      const result = await this.expenseRepository.softDelete(id);
      response.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  async summaryExpense(
    title: string,
    startDate: any,
    endDate: any,
    category: number
  ) {
    try {
        const qb = this.expenseRepository.createQueryBuilder('e')
        .leftJoinAndSelect('e.category','c')
        .select(`sum(e.amount)`,'summary')
        .addSelect('c.name','categoryName')
        if (title) {
            qb.andWhere("e.title ilike :title", { title: `%${title}%` });
        }
        if (startDate && endDate) {
            qb.andWhere('e.expenseDate Between :startDate and :endDate', {
              startDate: startDate,
              endDate: endDate,
        });
        }
        if(category){
            qb.where(`c.id = :cid`,{cid:category})
        }

        qb.groupBy(`c.id`)
        const result = await qb.getRawMany();
        
        return result;
    } catch (error) {
      throw error;
    }
  }
}
