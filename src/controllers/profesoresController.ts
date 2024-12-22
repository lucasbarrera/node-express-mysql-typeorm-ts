import { Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Profesor } from "../models/profesorModel";

const ProfesorRepository = AppDataSource.getRepository(Profesor);

class ProfesoresController {
  constructor() {}

  async consultar(req: Request, res: Response) {
    try {
      const data = await ProfesorRepository.find();
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
      const registro = await ProfesorRepository.findOneBy({ id: Number(id) });
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
      const registro = await ProfesorRepository.save(req.body);
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
      const registro = await ProfesorRepository.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("Profesor no encontrado");
      }
      await ProfesorRepository.update({ id: Number(id) }, req.body);
      const registroActualizado = await ProfesorRepository.findOneBy({
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
      const registro = await ProfesorRepository.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("Profesor no encontrado");
      }
      ProfesorRepository.delete({ id: Number(id) });
      res.send(204);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default new ProfesoresController();
