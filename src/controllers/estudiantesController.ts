import { Request, Response } from "express";
import { Estudiante } from "../models/estudianteModel";
import { AppDataSource } from "../db/conexion";

const EstudianteRepository = AppDataSource.getRepository(Estudiante);

class EstudiantesController {
  constructor() {}

  async consultar(req: Request, res: Response) {
    try {
      const data = await EstudianteRepository.find();
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
      const registro = await EstudianteRepository.findOneBy({ id: Number(id) });
      res.status(200).json(registro);
      if (!registro) {
        throw new Error("estudiante no encontrado");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async ingresar(req: Request, res: Response) {
    try {
      const registro = await EstudianteRepository.save(req.body);
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
      const registro = await EstudianteRepository.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("estudiante no encontrado");
      }
      await EstudianteRepository.update({ id: Number(id) }, req.body);
      const registroActualizado = await EstudianteRepository.findOneBy({
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
      const registro = await EstudianteRepository.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("estudiante no encontrado");
      }
      EstudianteRepository.delete({ id: Number(id) });
      res.send(204);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default new EstudiantesController();
