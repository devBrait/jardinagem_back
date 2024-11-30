import { Router } from 'express'
import {
  alternaEstadoAsync,
  cadastraPedido,
  getAllByFornecedorAsync,
  getAllByUserAsync,
  getAllPlantasByFornecedorAsync,
  getByIdAsync,
} from '../api/controllers/pedidoController'
import { verificaStatus } from '../api/controllers/pedidoController'
import verificarToken from '../middleware/auth'

const pedidoRouter = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idCliente:
 *           type: integer
 *           example: 123
 *         data_criacao:
 *           type: string
 *           format: date-time
 *           example: "2024-10-23T12:34:56Z"
 *         status:
 *           type: string
 *           example: "Pendente"
 *         valor_total:
 *           type: number
 *           format: float
 *           example: 150.75
 *         pedidoItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PedidoItem'
 *
 *     PedidoItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idPedido:
 *           type: integer
 *           example: 1
 *         idPlanta:
 *           type: integer
 *           example: 10
 *         quantidade:
 *           type: integer
 *           example: 2
 *         preco_unitario:
 *           type: number
 *           format: float
 *           example: 50.00
 */

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Operações relacionadas aos pedidos
 */
/**
/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obter status do pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *         required: true
 *         description: Obter status do pedido através do ID
 *     responses:
 *       201:
 *         description: Status do pedido retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status do pedido retornado com sucesso."
 *                 status:
 *                   type: string
 *                   example: "Pendente"
 *                   description: Status do pedido
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro na requisição. ID do pedido inválidos."
 */
pedidoRouter.get('/:id', verificarToken, verificaStatus)
/**
 * @swagger
 * /pedidos/getAll/{id}:
 *   get:  # Método GET para buscar pedidos
 *     summary: Obter pedidos do usuário
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário para obter os pedidos
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'  # Referência ao esquema Pedido
 *       404:
 *         description: Nenhum pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Nenhum pedido encontrado para este ID."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar pedidos"
 */

pedidoRouter.get('/getAllCliente/:id', verificarToken, getAllByUserAsync)
/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Cadastro de pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente
 *               - data_criacao
 *               - status
 *               - valor_total
 *               - pedidoItems
 *             properties:
 *               cliente:
 *                 type: string
 *                 example: "João da Silva"
 *               data_criacao:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-14T10:00:00Z"
 *                 description: Data de criação do pedido
 *               status:
 *                 type: string
 *                 example: "Pendente"
 *               valor_total:
 *                 type: number
 *                 format: float
 *                 example: 150.75
 *               pedidoItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: integer
 *                       example: 1
 *                     quantidade:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido criado com sucesso."
 *                 pedidoId:
 *                   type: integer
 *                   example: 123
 *                   description: ID do pedido criado
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro na requisição. Dados do pedido inválidos."
 */
pedidoRouter.post('/', verificarToken, cadastraPedido)

pedidoRouter.get(
  '/getAllFornecedor/:id',
  verificarToken,
  getAllByFornecedorAsync
)

pedidoRouter.get('/getById/:id', verificarToken, getByIdAsync)

pedidoRouter.get(
  '/getAllNomesPlantas/:idFornecedor/:idPedido',
  verificarToken,
  getAllPlantasByFornecedorAsync
)

pedidoRouter.put('/alterna-estado', verificarToken, alternaEstadoAsync)

export default pedidoRouter
