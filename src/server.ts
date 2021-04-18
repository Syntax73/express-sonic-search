import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";

createConnection().then(async _ => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.listen(3000, () => console.log("Servidor iniciado na porta: 3000"));
});
