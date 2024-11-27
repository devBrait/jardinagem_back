import { Router } from 'express'
import {
  alternaEstadoAsync,
  cadastroPlanta,
  updateQuantidadeAsync,
  getFornecedorPlantasDisponiveis,
  getPlantasByFornecedorId,
} from '../api/controllers/plantaController'
import verificarToken from '../middleware/auth'

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
plantaRouter.get('/fornecedor/:id', verificarToken, getPlantasByFornecedorId)
/**
 * @swagger
 *
 * /quantidade:
 *   put:
 *     summary: Atualiza a quantidade de uma planta
 *     description: Permite atualizar a quantidade disponível de uma planta no sistema. É necessário estar autenticado.
 *     tags: [Plantas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da planta a ser atualizada
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               quantidade:
 *                 type: integer
 *                 description: Nova quantidade da planta
 *                 example: 10
 *     responses:
 *       200:
 *         description: Quantidade da planta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     quantidade:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "ID ou quantidade inválidos"
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       404:
 *         description: Planta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Planta não encontrada"
 */
plantaRouter.put('/quantidade', verificarToken, updateQuantidadeAsync)
/**
 * @swagger
 *
 * /alterna-estado:
 *   put:
 *     summary: Alterna o estado de uma planta
 *     description: Ativa ou desativa o estado de uma planta com base no seu ID. É necessário estar autenticado.
 *     tags: [Plantas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da planta cujo estado será alternado
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Estado da planta alternado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     ativo:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "ID inválido"
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       404:
 *         description: Planta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Planta não encontrada"
 */
plantaRouter.put('/alterna-estado', verificarToken, alternaEstadoAsync)

export default plantaRouter
