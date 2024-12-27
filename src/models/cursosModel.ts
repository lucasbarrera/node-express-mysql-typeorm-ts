import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Profesor } from "./profesorModel";
import { Estudiante } from "./estudianteModel";

@Entity("cursos")
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column("text")
  descripcion: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.cursos)
  @JoinColumn({ name: "profesor_id" })
  profesor: Profesor;

  @ManyToMany(() => Estudiante)
  @JoinTable({
    name: "estudiantes_cursos",
    joinColumn: { name: "curso_id" },
    inverseJoinColumn: { name: "estudiante_id" },
  })
  estudiantes: Estudiante[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
