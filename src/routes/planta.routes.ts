import { Router } from 'express'
import { cadastroPlanta } from '../api/controllers/plantaController'
import verificarToken from '../middleware/auth'
import { getFornecedorPlantasDisponiveis } from '../api/controllers/plantaController'

const plantaRouter = Router()

plantaRouter.post('/planta', verificarToken, cadastroPlanta)

plantaRouter.get('/planta/:id/:quantidade', getFornecedorPlantasDisponiveis)

export default plantaRouter
