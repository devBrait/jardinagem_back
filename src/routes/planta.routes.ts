import { Router } from 'express'
import { cadastroPlanta } from '../api/controllers/plantaController'
import verificarToken from '../middleware/auth'

const plantaRouter = Router()

plantaRouter.post('/planta', verificarToken, cadastroPlanta)

export default plantaRouter
