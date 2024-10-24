import { Router } from 'express'
import { cadastraPedido } from '../api/controllers/pedidoController'

const pedidoRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Operações relacionadas aos pedidos
 */
/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Cadastro de pedido
 *     tags: [Pedidos]
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
pedidoRouter.post('/pedido', cadastraPedido)

export default pedidoRouter
