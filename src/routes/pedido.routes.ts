import { Router } from "express"
import { createAsync } from "api/services/pedidoService"

const pedidoRouter = Router()

pedidoRouter.post('/pedido', createAsync)

export default pedidoRouter