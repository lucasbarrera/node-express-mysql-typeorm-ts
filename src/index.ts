import app from "./app";
import { AppDataSource } from "./db/conexion";
const PORT = 3000;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("base de datos conectada");
    app.listen(PORT || 3001, () => {
      console.log("servidor activo");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
main();
