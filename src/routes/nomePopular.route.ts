import { Router } from 'express'
import verificarToken from './../middleware/auth'
import { AddAsync } from '../api/controllers/nomePopularController'

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

export default nomePopularRouter
