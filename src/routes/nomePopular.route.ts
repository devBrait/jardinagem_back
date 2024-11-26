import { Router } from 'express'
import verificarToken from './../middleware/auth'
import { AddAsync, GetAllAsync } from '../api/controllers/nomePopularController'

const nomePopularRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Nomes Populares
 *   description: Operações relacionadas aos nomes populares
 */

/**
 * @swagger
 * /nomes-populares:
 *   post:
 *     summary: Cria um novo nome popular
 *     description: Adiciona um novo nome popular ao banco de dados. Requer autenticação.
 *     tags: [Nomes Populares]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomePopular
 *               - idNomeCientifico
 *             properties:
 *               nomePopular:
 *                 type: string
 *                 example: "Rosa"
 *                 description: Nome popular a ser cadastrado
 *               idNomeCientifico:
 *                 type: integer
 *                 example: 1
 *                 description: ID do nome científico associado ao nome popular
 *           example:
 *             nomePopular: "Rosa"
 *             idNomeCientifico: 1
 *     responses:
 *       201:
 *         description: Nome popular criado com sucesso
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
 *                       type: integer
 *                       example: 1
 *                     nomePopular:
 *                       type: string
 *                       example: "Rosa"
 *                     idNomeCientifico:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00Z"
 *       400:
 *         description: Erro de validação ou nome popular já existe
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
 *                   example: "Nome popular é obrigatório"
 *       401:
 *         description: Não autorizado
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
 *                   example: "Token não fornecido ou inválido"
 *       409:
 *         description: Conflito - Nome popular já existe
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
 *                   example: "Nome popular já cadastrado"
 *       500:
 *         description: Erro interno do servidor
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
 *                   example: "Erro interno do servidor"
 */
nomePopularRouter.post('/', verificarToken, AddAsync)
/**
 * @swagger
 * /nomes-populares:
 *   get:
 *     summary: Lista todos os nomes populares
 *     description: Recupera uma lista de todos os nomes populares cadastrados no banco de dados, com informações relacionadas.
 *     tags: [Nomes Populares]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de nomes populares retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: "Rosa"
 *                       idNomeCientifico:
 *                         type: integer
 *                         example: 1
 *                       nomeCientifico:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nome:
 *                             type: string
 *                             example: "Rosa spp."
 *                       plantas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 10
 *                             nome:
 *                               type: string
 *                               example: "Planta de Rosa"
 *                             preco:
 *                               type: number
 *                               format: float
 *                               example: 15.50
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 10
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrevious:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Não autorizado
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
 *                   example: "Token não fornecido ou inválido"
 *       500:
 *         description: Erro interno do servidor
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
 *                   example: "Erro interno do servidor"
 */
nomePopularRouter.get('/', verificarToken, GetAllAsync)

export default nomePopularRouter
