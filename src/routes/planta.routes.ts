import { Router } from 'express'
import { cadastroPlanta } from '../api/controllers/plantaController'
import verificarToken from '../middleware/auth'
import { getFornecedorPlantasDisponiveis } from '../api/controllers/plantaController'

const plantaRouter = Router()

plantaRouter.post('/planta', verificarToken, cadastroPlanta)

/**
 * @swagger
 * tags:
 *   name: Plantas
 *   description: Operações relacionadas às plantas
 */
/**
/**
* @swagger
* 
* /plantas/planta/{id}/{quantidade}:
*   get: # Método GET para ver fornecedores e plantas disponíveis
*       summary: Obter plantas e fornecedores disponíveis
*       tags: [Plantas]
*       parameters:
*           - in: path
*             name: id
*             required: true
*             description: Id da planta popular
*             schema:
*               type: integer
*               example: 1
*           - in: path
*             name: quantidade
*             required: true
*             description: Quantidade de plantas a ser verificada
*             schema:
*               type: integer
*               example: 1
*       responses:
*           201:
*               description: Lista de plantas e fornecedores disponíveis retornados com sucesso
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                                type: object
*                                properties:
*                                     success:
*                                        type: boolean
*                                        example: true
*                                     fornecedor:
*                                        type: integer
*                                        example: 1
*                                     quantidade:
*                                        type: integer
*                                        example: 1
*           500:
*               description: Erro interno no servidor
*               content: 
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               success:
*                                   type: boolean
*                                   example: false
*                               error:
*                                   type: string
*                                   example: "Ocorreu um erro ao buscar as plantas"
* 
*/
plantaRouter.get('/planta/:id/:quantidade', getFornecedorPlantasDisponiveis)

export default plantaRouter
