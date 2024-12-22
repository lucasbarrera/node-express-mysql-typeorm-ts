import express from "express";
import cors from "cors";
import morgan from "morgan";
import "reflect-metadata";

import routerEstudiantes from "./routes/estudiantesRoutes";
import routerProfesores from "./routes/profesoresRoutes";
import routerCursos from "./routes/cursosRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/estudiantes", routerEstudiantes);

app.use("/profesores", routerProfesores);

app.use("/cursos", routerCursos);

export default app;
