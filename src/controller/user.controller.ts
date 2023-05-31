import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserEntities } from "../entity/user.entitiy";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const jwtSecret =
  "e87b679dd890c323ff2d069a2ce9104f8939eb07b5fea7544260510c392865fd78b117";

export class UserController {
  private userRepository = AppDataSource.getRepository(UserEntities);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password } = request.body;
      const user = await this.userRepository.findOneBy({ username });

      if (!user) {
        response.status(404).json({
          status: "fail",
          message: "User not found",
        });
        return;
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        response.status(400).json({
          status: "fail",
          message: "Incorrect password",
        });
        return;
      }

      const token = jwt.sign({ id: user.id, username }, jwtSecret);
      response.cookie("jwt", token, { httpOnly: true });

      response.status(200).json({
        status: "success",
        token: token,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age, username, password } = request.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = Object.assign(new UserEntities(), {
      firstName,
      lastName,
      age,
      username,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
