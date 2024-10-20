import { Router } from 'express'

import {
  cadastroAsync,
  loginAsync,
} from '../api/controllers/fornecedorController'

const fornecedorRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Fornecedores
 *   description: Operações relacionadas aos fornecedores
 */
/**
 * @swagger
 * /fornecedores:
 *   post:
 *     summary: Cadastro de fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CNPJ
 *               - razao_social
 *               - ctt_1
 *               - telefone_1
 *               - email
 *               - CEP
 *               - senha
 *             properties:
 *               CNPJ:
 *                 type: string
 *                 example: "12345678901234"
 *               nome_fantasia:
 *                  type: string
 *                  example: "mackbot"
 *               razao_social:
 *                 type: string
 *                 example: "Empresa XYZ Ltda"
 *               ctt_1:
 *                 type: string
 *                 example: "Maria Silva"
 *                 description: Nome do contato principal
 *               telefone_1:
 *                 type: int
 *                 example: 11987654321
 *               ctt_2:
 *                 type: string
 *                 example: "João Santos"
 *               telefone_2:
 *                 type: int
 *                 example: 11912345678
 *               email:
 *                 type: string
 *                 example: "empresa@xyz.com"
 *               site:
 *                 type: string
 *                 example: "https://www.empresaxyz.com.br"
 *               instagram:
 *                 type: string
 *                 example: "@empresa_xyz"
 *               CEP:
 *                 type: string
 *                 example: "12345-678"
 *                 description: Código Postal do fornecedor
 *               obs:
 *                 type: string
 *                 example: "Fornecedor especializado em produtos agrícolas."
 *               ativo:
 *                 type: boolean
 *                 example: true
 *               senha:
 *                 type: string
 *                 example: "123456"
 *                 description: Senha para acesso ao sistema
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fornecedor criado com sucesso."
 *                 fornecedorId:
 *                   type: integer
 *                   example: 123
 *                   description: ID do fornecedor criado
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro na requisição. CNPJ, email ou CEP já cadastrados."
 */
fornecedorRouter.post('/', cadastroAsync)
/**
 * @swagger
 * /fornecedores/login:
 *   post:
 *     summary: Login de fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "empresa@xyz.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Credenciais inválidas
 */
fornecedorRouter.post('/login', loginAsync)

export default fornecedorRouter
