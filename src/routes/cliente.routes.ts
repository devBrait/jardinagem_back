import { Router } from 'express'

import { registerAsync } from '../api/controllers/clienteController'

const clienteRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operações relacionadas aos clientes (paisagistas)
 */
/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Pereira"
 *               email:
 *                 type: string
 *                 example: "joao.pereira@example.com"
 *               CPF:
 *                  type: string
 *                  example: "111.222.333-44"
 *               data_nascimento:
 *                  type: string
 *                  format: date
 *                  example: "2005-04-22"
 *               CEP:
 *                  type: string
 *                  example: "11111-100"
 *               telefone:
 *                  type: string
 *                  example: "11 9 1234-0631"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Requisição inválida
 */

clienteRouter.post('/', registerAsync)

export default clienteRouter
