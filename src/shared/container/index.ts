import { container } from "tsyringe";

import "@modules/users/providers";
import "./providers";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IUsersTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import UsersTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

import IFilesRepository from "@modules/files/repositories/IFilesRepository";
import FilesRepository from "@modules/files/infra/typeorm/repositories/FilesRepository";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UserTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IFilesRepository>(
  "FilesRepository",
  FilesRepository,
);