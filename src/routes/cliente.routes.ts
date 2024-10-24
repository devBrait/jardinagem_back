import { Router } from 'express'

import {
  cadastroAsync,
  loginAsync,
  redefinirSenhaAsync,
} from '../api/controllers/clienteController'
import verificarToken from '../middleware/auth'

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
 *     summary: Cadastro de cliente
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
 *                  type: int
 *                  example: 11122233344
 *               data_nascimento:
 *                  type: string
 *                  format: date
 *                  example: "2005-04-22"
 *               CEP:
 *                  type: string
 *                  example: "11111-100"
 *               telefone:
 *                  type: int
 *                  example: 11912340631
 *               senha:
 *                  type: string
 *                  example: "123456"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Requisição inválida
 */

clienteRouter.post('/', cadastroAsync)
/**
 * @swagger
 * /clientes/login:
 *   post:
 *     summary: Login de cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao.pereira@example.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Credenciais inválidas
 */
clienteRouter.post('/login', loginAsync)
/**
 * @swagger
 * /clientes/redefinir-senha:
 *   put:
 *     summary: Redefinir senha de cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao.pereira@example.com"
 *               senha:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Erro ao redefinir a senha, como cliente não encontrado ou senha inválida
 */
clienteRouter.put('/redefinir-senha', redefinirSenhaAsync)

export default clienteRouter
