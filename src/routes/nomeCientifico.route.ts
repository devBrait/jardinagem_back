import {
  AddAsync,
  getAllAsync,
  getCientificoAndPopularAsync,
} from '../api/controllers/nomeCientificoController'
import { Router } from 'express'
import verificarToken from './../middleware/auth'

const nomeCientificoRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Nomes Científicos
 *   description: Operações relacionadas aos nomes científicos
 */
/**
 * @swagger
 * /nomes-cientificos:
 *   get:
 *     summary: Lista nomes científicos com paginação
 *     description: Retorna uma lista paginada de nomes científicos. Requer autenticação.
 *     tags: [Nomes Científicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Número da página desejada
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Termo para busca opcional
 *     responses:
 *       200:
 *         description: Lista de nomes científicos retornada com sucesso
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
 *                         example: "Panthera leo"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00Z"
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
 *       400:
 *         description: Erro na requisição
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
 *                   example: "Parâmetros inválidos"
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
nomeCientificoRouter.get('/', verificarToken, getAllAsync)
/**
 * @swagger
 * /nomes-cientificos/cientifico-com-popular:
 *   get:
 *     summary: Obtém os nomes científicos junto com seus respectivos nomes populares
 *     description: Retorna uma lista de nomes científicos com os nomes populares associados. Requer autenticação.
 *     tags: [Nomes Científicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de nomes científicos com os respectivos nomes populares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nomeCientifico:
 *                     type: string
 *                     example: "Rosa"
 *                   nomesPopulares:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nomePopular:
 *                           type: string
 *                           example: "Rosa"
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
nomeCientificoRouter.get(
  '/cientifico-com-popular',
  verificarToken,
  getCientificoAndPopularAsync
)
/**
 * @swagger
 * /nomes-cientificos:
 *   post:
 *     summary: Cria um novo nome científico
 *     description: Adiciona um novo nome científico ao banco de dados. Requer autenticação.
 *     tags: [Nomes Científicos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeCientifico
 *             properties:
 *               nomeCientifico:
 *                 type: string
 *                 example: "Panthera leo"
 *                 description: Nome científico a ser cadastrado
 *           example:
 *             nomeCientifico: "Panthera leo"
 *     responses:
 *       201:
 *         description: Nome científico criado com sucesso
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
 *                     nomeCientifico:
 *                       type: string
 *                       example: "Panthera leo"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00Z"
 *       400:
 *         description: Erro de validação ou nome científico já existe
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
 *                   example: "Nome científico é obrigatório"
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
 *         description: Conflito - Nome científico já existe
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
 *                   example: "Nome científico já cadastrado"
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
nomeCientificoRouter.post('/', verificarToken, AddAsync)

export default nomeCientificoRouter
