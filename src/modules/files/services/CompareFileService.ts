import { injectable, inject } from "tsyringe";

import Files from "@modules/files/infra/typeorm/entities/Files";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IFilesRepository from "../repositories/IFilesRepository";
import uploadConfig from "@config/upload";
import crypto from 'crypto';
import path from "path";
import mime from 'mime';
import fs from 'fs';
import AWS from "aws-sdk";

interface IRequest {
  id_arquivo: string;
  avatar_filename: string;
}

@injectable()
class CompareFileService {
  constructor(
    @inject("FilesRepository")
    private filesRepository: IFilesRepository,

    @inject("S3StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id_arquivo, avatar_filename }: IRequest): Promise<boolean> {

    AWS.config.update({
      accessKeyId: 'AKIAZJR6O3IOKOA2ATUW',
      secretAccessKey: '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',
      region: 'us-east-1',
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    const log = 'logArquivo';
    const fileId = '1';
    const claro = '21';

    /*
    const params = {
      TableName: log,
      Key:{
        "id": fileId,
  }};
  
  docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:");
          console.log(data);
      }
  });
  */ 
    const file = await this.filesRepository.show(id_arquivo);

    if(!file) {
        throw Error('Erro, file nao existe');
    }

    const algorithm = 'aes-256-ctr';
    const password = 'd6F3Efeq';

    const originalPath = path.resolve(uploadConfig.tmpFolder, avatar_filename);

    const ContentType = mime.getType(originalPath);

    if(!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const ByteToStringMD5Hash = Buffer.from(fileContent).toString('utf8');

    var cipher = crypto.createCipher(algorithm,password);
    const hash = cipher.update(ByteToStringMD5Hash,'utf8','hex');

    const hash_file = hash.toString();

    if(hash_file === file.hash_file) {
        return true;
    } else {
        return false;
    }
  }
}

export default CompareFileService;