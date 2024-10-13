"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../api/controllers/clienteController");
const clienteRouter = (0, express_1.Router)();
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
 *                  type: int
 *                  example: 11912340631
 *               senha:
 *                  type: string
 *                  example: "1234"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
clienteRouter.post('/', clienteController_1.cadastroAsync);
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
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Credenciais inválidas
 */
clienteRouter.post('/login', clienteController_1.loginAsync);
exports.default = clienteRouter;
//# sourceMappingURL=cliente.routes.js.map