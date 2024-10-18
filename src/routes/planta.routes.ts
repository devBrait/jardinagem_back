import { Router} from "express";
import { cadastroPlanta } from "../api/controllers/plantaController";

const plantaRouter = Router()

plantaRouter.post('/planta', cadastroPlanta)

export default plantaRouter