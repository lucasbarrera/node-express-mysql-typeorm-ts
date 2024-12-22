import { DataSource } from "typeorm";
import { Estudiante } from "../models/estudianteModel";
import { Profesor } from "../models/profesorModel";
import { Curso } from "../models/cursosModel";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Lucas7698",
  database: "cursos",
  synchronize: true,
  logging: true,
  entities: [Estudiante, Profesor, Curso],
});
