import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarService from "@modules/files/services/UpdateUserAvatarService";
import IndexFilesService from "@modules/files/services/IndexFilesService";
import DeleteFileService from "@modules/files/services/DeleteFileService";
import UpdateFileAvatarService from "@modules/files/services/UpdateFileAvatarService";
import fs from 'fs';
import CompareFileService from "@modules/files/services/CompareFileService";


export default class FilesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const cod_user: number = Number(request.user.id);
    //let dataBuffer = fs.readFileSync(request.file);

    const file = await updateUserAvatar.execute({
      cod_user,
      avatar_filename: request.file.filename,
    });

    return response.json(file);
  }

  public async compare(request: Request, response: Response): Promise<Response> {
    const compareFile = container.resolve(CompareFileService);
    console.log('Chegou aqui');
    //let dataBuffer = fs.readFileSync(request.file);

    const {id_arquivo} = request.params;

    const file = await compareFile.execute({
      id_arquivo,
      avatar_filename: request.file.filename,
    });
    console.log(file);

    return response.json(file);
  }

  public async updateFile(request: Request, response: Response): Promise<Response> {
    const updateFileAvatar = container.resolve(UpdateFileAvatarService);

    const { id_arquivo } = request.params;

    const file = await updateFileAvatar.execute({
      id_arquivo,
      avatar_filename: request.file.filename,
    });
    
    return response.json(file);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const cod_user: number = Number(request.user.id);

    const indexFiles = container.resolve(IndexFilesService);

    const files = await indexFiles.execute({
      cod_user,
    });

    return response.json(files);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id_arquivo } = request.params;

    const deleteFile = container.resolve(DeleteFileService);

    const files = await deleteFile.execute({
      id_arquivo,
    });

    return response.json({message: 'ok'});
  }
}
