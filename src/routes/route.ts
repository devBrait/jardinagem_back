import { Router } from 'express'

import clienteRouter from './cliente.routes'

const mainRouter = Router()

mainRouter.use('/clientes', clienteRouter)

export default mainRouter
