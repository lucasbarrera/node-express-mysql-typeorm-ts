import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Curso } from "../models/cursosModel";
import { Profesor } from "../models/profesorModel";
import { Estudiante } from "../models/estudianteModel";

const CursoRepository = AppDataSource.getRepository(Curso);
const ProfesorRepository = AppDataSource.getRepository(Profesor);
const EstudianteRepository = AppDataSource.getRepository(Estudiante);

class CursosController {
  constructor() {}

  async consultar(req: Request, res: Response) {
    try {
      const data = await CursoRepository.find({
        relations: ["profesor", "estudiantes"],
      });
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await CursoRepository.findOne({
        where: { id: Number(id) },
        relations: ["profesor", "estudiantes"],
      });
      res.status(200).json(registro);
      if (!registro) {
        throw new Error("Curso no encontrado");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async ingresar(req: Request, res: Response) {
    try {
      const { id, profesor } = req.body;
      const registroProfesor = await ProfesorRepository.findOneBy({
        id: Number(profesor),
      });
      if (!registroProfesor) {
        throw new Error("Profesor no encontrado");
      }
      const registro = await CursoRepository.save(req.body);
      res.status(201).json(registro);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async actualizar(req: Request, res: Response) {
    const { id, profesor } = req.params;
    try {
      const registroProfesor = await ProfesorRepository.findOneBy({
        id: Number(profesor),
      });
      if (!registroProfesor) {
        throw new Error("Profesor no encontrado");
      }
      const registroCurso = await CursoRepository.findOneBy({ id: Number(id) });
      if (!registroCurso) {
        throw new Error("Curso no encontrado");
      }
      const registroActualizado = await CursoRepository.update(
        { id: Number(id) },
        req.body
      );
      res.status(200).json(registroActualizado);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async borrar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await CursoRepository.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("Curso no encontrado");
      }
      CursoRepository.delete({ id: Number(id) });
      res.send(204);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async asociarEstudiante(req: Request, res: Response) {
    const { estudiante_id, curso_id } = req.body;
    try {
      const estudiante = await EstudianteRepository.findOneBy({
        id: Number(estudiante_id),
      });
      if (!estudiante) {
        throw new Error("Estudiante no encontrado");
      }
      const curso = await CursoRepository.findOne({
        where: { id: Number(curso_id) },
        relations: ["estudiantes"],
      });
      if (!curso) {
        throw new Error("Curso no encontrado");
      }
      if (curso.estudiantes.some((e) => e.id === estudiante.id)) {
        throw new Error("Estudiante ya asociado al curso");
      }
      curso.estudiantes = curso.estudiantes || [];
      curso.estudiantes.push(estudiante);
      await CursoRepository.save(curso);
      res.status(201).json(curso);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default new CursosController();
