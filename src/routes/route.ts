import { Router } from 'express'

import clienteRouter from './cliente.routes'
import fornecedorRouter from './fornecedor.routes'
import pedidoRouter from './pedido.routes'

const mainRouter = Router()

mainRouter.use('/clientes', clienteRouter)
mainRouter.use('/fornecedores', fornecedorRouter)
mainRouter.use('/pedidos', pedidoRouter)

export default mainRouter
