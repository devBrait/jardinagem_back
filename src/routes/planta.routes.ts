import { Router } from 'express'
import { cadastroPlanta } from '../api/controllers/plantaController'
import verificarToken from '../middleware/auth'
import { getFornecedorPlantasDisponiveis } from '../api/controllers/plantaController'
import * as plantaController from '../api/controllers/plantaController'

const plantaRouter = Router()

plantaRouter.post('/cadastro-planta', verificarToken, cadastroPlanta)

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
plantaRouter.get(
  '/planta/:id/:quantidade',
  verificarToken,
  getFornecedorPlantasDisponiveis
)

/**
 * @swagger
 *
 * /plantas/fornecedor/{id}:
 *   get: #Método get para retornar plantas dos fornecedores
 *       summary: Obter plantas a partir do id do fornecedor
 *       tags: [Plantas]
 *       parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: id do fornecedor
 *             schema:
 *               type: integer
 *               example: 1
 *       responses:
 *           200:
 *               description: Lista de plantas de fornecedores retornados com sucesso
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               success:
 *                                   type: boolean
 *                                   example: true
 *                               data:
 *                                   type: array
 *                                   items:
 *                                       type: object
 *                                       properties:
 *                                           id:
 *                                               type: int
 *                                               example: 1
 *                                           idFornecedor:
 *                                               type: int
 *                                               example: 1
 *                                           idNomeCientifico:
 *                                               type: int
 *                                               example: 1
 *                                           idNomePopular:
 *                                               type: int
 *                                               example: 1
 *                                           variedade:
 *                                               type: string
 *                                           cor_floracao:
 *                                               type: string
 *                                           porte:
 *                                               type: string
 *                                           topiaria:
 *                                               type: string
 *                                           forma_tronco:
 *                                               type: string
 *                                           quant_ramos:
 *                                               type: int
 *                                               example: 3
 *                                           dap:
 *                                               type: int
 *                                           diametro_copa:
 *                                               type: float
 *                                           altura_total:
 *                                               type: float
 *                                           peso_medio:
 *                                               type: float
 *                                           volume:
 *                                               type: int
 *                                           entouceirada:
 *                                               type: boolean
 *                                               example: false
 *                                           tutorada:
 *                                               type: boolean
 *                                               example: true
 *                                           embalagem:
 *                                               type: string
 *                                           diametro_base:
 *                                               type: float
 *                                           concatenar_diametro:
 *                                               type: boolean
 *                                               example: false
 *                                           obs:
 *                                               type: string
 *                                           quantidade:
 *                                               type: int
 *                                               example: 1
 *                                           preco:
 *                                              type: float
 *                                              example: 10.0
 *                                           ativo:
 *                                               type: boolean
 *                                               example: true
 *           404:
 *               description: Plantas não existem ou fornecedor não encontrado
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               sucess:
 *                                   type: boolean
 *                                   example: false
 *                               error:
 *                                   type: string
 *                                   example: "Plantas não encontradas"
 *
 */
plantaRouter.get('/fornecedor/:id', plantaController.getPlantaByFornecedorId)

export default plantaRouter
