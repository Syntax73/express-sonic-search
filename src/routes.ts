import { Router } from "express";
import { productContoller } from "./controller/productController";

const routes = Router();
const controller = productContoller();

routes.get("/produto", controller.index);
routes.get("/produto/sugestao", controller.suggest);
routes.post("/produto", controller.create);

export default routes;
