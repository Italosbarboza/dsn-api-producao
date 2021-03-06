import fs from "fs";
import path from "path";
import aws, {S3} from "aws-sdk";
import mime from 'mime';
import uploadConfig from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";
import SimpleCrypto from "simple-crypto-js";
import crypto from 'crypto';

class DiskStorageProvider implements IStorageProvider {

  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
  
      const originalPath = path.resolve(uploadConfig.tmpFolder, file);

      const ContentType = mime.getType(originalPath);

      if(!ContentType) {
        throw new Error('File not found');
      }

      const fileContent = await fs.promises.readFile(originalPath);

      await this.client.putObject({
        Bucket: 'web-validador-dsn',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      }).promise();

      return file;
  }

  public async deleteFile(file: string): Promise<void> {
    
    await this.client.deleteObject({
      Bucket: 'web-validador-dsn',
      Key: file,
    }).promise();
  }
}

export default DiskStorageProvider;
