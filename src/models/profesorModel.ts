import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Curso } from "./cursosModel";

@Entity("profesores")
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  profesion: string;

  @Column()
  telefono: string;

  @OneToMany(() => Curso, (curso) => curso.profesor)
  cursos: Curso[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
