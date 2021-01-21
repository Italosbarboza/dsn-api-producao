import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[] | null> {
    const user = await this.usersRepository.findById(user_id);

    const users = this.usersRepository.findAllUsers();
    console.log(users);    

    return users;
  }
}

export default ListUsersService;