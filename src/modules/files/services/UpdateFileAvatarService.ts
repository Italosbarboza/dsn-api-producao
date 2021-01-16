import { injectable, inject } from "tsyringe";

import Files from "@modules/files/infra/typeorm/entities/Files";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IFilesRepository from "../repositories/IFilesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id_arquivo: string;
    avatar_filename: string;
}

@injectable()
class UpdateFileAvatarService
 {
  constructor(
    @inject("FilesRepository")
    private filesRepository: IFilesRepository,

    @inject("S3StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id_arquivo, avatar_filename }: IRequest): Promise<Files> {
    /*
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
*/
    const file = await this.filesRepository.show(id_arquivo);

    if (!file) {
      throw new AppError("User not found.");
    }

    const filename: string = await this.storageProvider.saveFile(avatar_filename);

    const nome_arquivo = avatar_filename;

    file.nome_arquivo = nome_arquivo;

    await this.filesRepository.save(file);

    return file;
  }
}

export default UpdateFileAvatarService;
