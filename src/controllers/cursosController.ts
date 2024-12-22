import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Curso } from "../models/cursosModel";

const CursoRepository = AppDataSource.getRepository(Curso);

class CursosController {
  constructor() {}

  async consultar(req: Request, res: Response) {
    try {
      const data = await CursoRepository.find();
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
      const registro = await CursoRepository.findOneBy({ id: Number(id) });
      res.status(200).json(registro);
      if (!registro) {
        throw new Error("Profesor no encontrado");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async ingresar(req: Request, res: Response) {
    try {
      const registro = await CursoRepository.save(req.body);
      res.status(201).json(registro);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await CursoRepository.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("Curso no encontrado");
      }
      await CursoRepository.update({ id: Number(id) }, req.body);
      const registroActualizado = await CursoRepository.findOneBy({
        id: Number(id),
      });
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
    try {
      const registro = await CursoRepository.save(req.body);
      res.status(201).json(registro);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default new CursosController();
