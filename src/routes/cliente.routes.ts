import { Router } from 'express'

import {
  alternaEstadoContaAsync,
  atualizarDadosAsync,
  cadastroAsync,
  getAllByEmail,
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
/**
 * @swagger
 * /clientes/{email}:
 *   get:
 *     summary: Obtém os dados do cliente pelo email
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: O email do cliente a ser pesquisado
 *         schema:
 *           type: string
 *           example: "joao.pereira@example.com"
 *     responses:
 *       200:
 *         description: Dados do cliente obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do cliente
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   description: Nome do cliente
 *                   example: "João Pereira"
 *                 email:
 *                   type: string
 *                   description: Email do cliente
 *                   example: "joao.pereira@example.com"
 *                 CPF:
 *                   type: string
 *                   description: CPF do cliente
 *                   example: "11122233344"
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *                   description: Data de nascimento do cliente
 *                   example: "2005-04-22"
 *                 CEP:
 *                   type: string
 *                   description: CEP do cliente
 *                   example: "11111-100"
 *                 telefone:
 *                   type: string
 *                   description: Telefone do cliente
 *                   example: "11912340631"
 *                 ativo:
 *                   type: boolean
 *                   description: Indica se o cliente está ativo
 *                   example: true
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
clienteRouter.get('/:email', verificarToken, getAllByEmail)
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
 *     summary: Redefine senha do cliente
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
/**
 * @swagger
 * /clientes/atualizar-dados:
 *   put:
 *     summary: Atualiza dados do cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do cliente a ser atualizado
 *                 example: "joao.pereira@example.com"
 *               nome:
 *                 type: string
 *                 example: "João Pereira"
 *               telefone:
 *                 type: string
 *                 example: "11912340631"
 *               CPF:
 *                 type: string
 *                 example: "11122233344"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "2005-04-22"
 *               CEP:
 *                 type: string
 *                 example: "11111-100"
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Dados do cliente atualizados com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
clienteRouter.put('/atualizar-dados', verificarToken, atualizarDadosAsync)
/**
 * @swagger
 * /clientes/alterna-estado:
 *   put:
 *     summary: Alterna o estado da conta do cliente (ativa ou desativa)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O email do cliente cuja conta será ativada ou desativada
 *                 example: cliente@example.com
 *     responses:
 *       200:
 *         description: Conta ativada ou desativada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Conta ativada com sucesso"
 *       400:
 *         description: Erro ao alternar o estado da conta
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
 *                   example: "Cliente não encontrado"
 */

clienteRouter.put('/alterna-estado', verificarToken, alternaEstadoContaAsync)

export default clienteRouter
