import { Router } from 'express'

import {
  alternaEstadoContaAsync,
  atualizarDadosAsync,
  cadastroAsync,
  loginAsync,
} from '../api/controllers/fornecedorController'
import { redefinirSenhaAsync } from '../api/controllers/clienteController'
import verificarToken from '../middleware/auth'

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
/**
 * @swagger
 * /fornecedores/redefinir-senha:
 *   put:
 *     summary: Redefinir senha de fornecedor
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
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Erro ao redefinir a senha, como cliente não encontrado ou senha inválida
 * */
fornecedorRouter.put('/redefinir-senha', redefinirSenhaAsync)

/**
 * @swagger
 * /fornecedores/atualizar-dados:
 *   put:
 *     summary: Atualiza dados do fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_empresa:
 *                 type: string
 *                 description: Nome da empresa fornecedora
 *                 example: "Empresa Exemplo Ltda"
 *               CNPJ:
 *                 type: string
 *                 description: CNPJ da empresa fornecedora
 *                 example: "12345678000199"
 *               email:
 *                 type: string
 *                 description: Email de contato da empresa fornecedora
 *                 example: "contato@empresaexemplo.com"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de fundação da empresa fornecedora
 *                 example: "2001-05-10"
 *               CEP:
 *                 type: string
 *                 description: CEP da localização da empresa
 *                 example: "11111-100"
 *               site_empresa:
 *                 type: string
 *                 description: Site oficial da empresa fornecedora
 *                 example: "https://www.empresaexemplo.com"
 *               Instagram:
 *                 type: string
 *                 description: Perfil do Instagram da empresa fornecedora
 *                 example: "@empresaexemplo"
 *               nome_contato:
 *                 type: string
 *                 description: Nome da pessoa de contato na empresa fornecedora
 *                 example: "Ana Souza"
 *               telefone:
 *                 type: string
 *                 description: Telefone de contato da empresa fornecedora
 *                 example: "11912340631"
 *               ativo:
 *                 type: boolean
 *                 description: Status da conta do fornecedor
 *                 example: true
 *     responses:
 *       200:
 *         description: Dados do fornecedor atualizados com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Fornecedor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

fornecedorRouter.put('/atualizar-dados', verificarToken, atualizarDadosAsync)

/**
 * @swagger
 * /fornecedores/alterna-estado:
 *   put:
 *     summary: Alterna o estado da conta do fornecedor (ativa ou desativa)
 *     tags: [Fornecedores]
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
 *                 description: O email do fornecedor cuja conta será ativada ou desativada
 *                 example: "fornecedor.exemplo@empresa.com"
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
 *                   example: "Fornecedor não encontrado"
 */

fornecedorRouter.put('/alterna-estado', verificarToken, alternaEstadoContaAsync)

export default fornecedorRouter
