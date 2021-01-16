import { getRepository, Repository, Not } from "typeorm";

import path from "path";
import mime from 'mime';
import fs from 'fs';

import IFilesRepository from "@modules/files/repositories/IFilesRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";
import uploadConfig from "@config/upload";

import SimpleCrypto from "simple-crypto-js";
import crypto from 'crypto';


import Files from "../entities/Files";

class FilesRepository implements IFilesRepository {
  private ormRepository: Repository<Files>;

  constructor() {
    this.ormRepository = getRepository(Files);
  }
  /*
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  } 
  */

  public async create(cod_user: number, nome_arquivo: string): Promise<Files> {

    const algorithm = 'aes-256-ctr';
    const password = 'd6F3Efeq';
    
    const originalPath = path.resolve(uploadConfig.tmpFolder, nome_arquivo);

    const ContentType = mime.getType(originalPath);

    if(!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const ByteToStringMD5Hash = Buffer.from(fileContent).toString('utf8');

    var cipher = crypto.createCipher(algorithm,password);
    const hash = cipher.update(ByteToStringMD5Hash,'utf8','hex');

    const hash_file = hash.toString();
    
    const file = this.ormRepository.create({
        cod_user,
        nome_arquivo,
        hash_file,
    });

    const files = await this.ormRepository.save(file);

    return files;
  }
/*
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllUsers(): Promise<User[] | null> {
    return this.ormRepository.find();
  }

  public async  deleteUsers(userDelete: User): Promise<void> {
    return this.ormRepository.remove(userDelete);
  }
*/
public async index(cod_user: number): Promise<Files[]> {
  const codigo_user = String(cod_user);
  const file = this.ormRepository.find({
        where: {cod_user: codigo_user},
    });
    return file;
  }

public async show(id_arquivo: string): Promise<Files | undefined> {
 
  const file = await this.ormRepository.findOne(id_arquivo);
 
  return file;
}

public async delete(id_arquivo: string): Promise<void> {
  const file = await this.show(id_arquivo);
  if(file) {
    await this.ormRepository.remove(file);
  }
}

public async save(files: Files): Promise<Files> {
  return this.ormRepository.save(files);
}

}

export default FilesRepository;