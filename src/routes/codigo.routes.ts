import { Router } from 'express'
import { enviaCodigoAsync } from '../api/controllers/codigoController'

const codigoRouter = Router()

codigoRouter.post('/envia-codigo', enviaCodigoAsync)

export default codigoRouter
