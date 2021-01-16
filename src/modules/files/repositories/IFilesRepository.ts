import Files from "../infra/typeorm/entities/Files";

export default interface IFilesRepository {
  create(cod_user: number, nome_arquivo: string): Promise<Files>;
  index(cod_user: number): Promise<Files[]>;
  show(id_arquivo: string): Promise<Files | undefined>;
  //showFile(id_arquivo: string): Promise<Files>;
  delete(id_arquivo: string): Promise<void>;
  save(files: Files): Promise<Files>;
}
