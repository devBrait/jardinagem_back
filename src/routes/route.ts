import { Router } from 'express'

import clienteRouter from './cliente.routes'
import fornecedorRouter from './fornecedor.routes'
import pedidoRouter from './pedido.routes'
import plantaRouter  from './planta.routes'

const mainRouter = Router()

mainRouter.use('/clientes', clienteRouter)
mainRouter.use('/fornecedores', fornecedorRouter)
mainRouter.use('/pedidos', pedidoRouter)
mainRouter.use('/plantas', plantaRouter)


export default mainRouter
