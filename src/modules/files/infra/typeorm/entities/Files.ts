import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
import User from "@modules/users/infra/typeorm/entities/User";
  
  @Entity("files", { database: "sabm" })
  class File {
    @PrimaryGeneratedColumn("increment")
    id_arquivo: number;
  
    @Column("int")
    cod_user: number;
  
    @Column("varchar")
    nome_arquivo: string;

    @Column("text")
    hash_file: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: "cod_user" })
    user: User;
}
  
  export default File;
  