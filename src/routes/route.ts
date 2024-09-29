import { Router } from 'express'

import clienteRouter from './cliente.routes'
import fornecedorRouter from './fornecedor.routes'

const mainRouter = Router()

mainRouter.use('/clientes', clienteRouter)
mainRouter.use('/fornecedores', fornecedorRouter)

export default mainRouter
