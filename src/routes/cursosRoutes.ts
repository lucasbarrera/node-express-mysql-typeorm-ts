import express from "express";
import CursosController from "../controllers/cursosController";
const router = express.Router();

router.get("/", CursosController.consultar);

router.post("/", CursosController.ingresar);
router.post("/regest", CursosController.asociarEstudiante);

router
  .route("/:id")
  .get(CursosController.consultarDetalle)
  .put(CursosController.actualizar)
  .delete(CursosController.borrar);

export default router;
