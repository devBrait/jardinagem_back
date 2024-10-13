import { Router } from 'express'
import { cadastraPedido } from '../api/controllers/pedidoController'

const pedidoRouter = Router()

pedidoRouter.post('/pedido', cadastraPedido)

export default pedidoRouter
