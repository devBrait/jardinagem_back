import { loginAsync } from '../api/controllers/adminController'
import { Router } from 'express'

const adminRouter = Router()

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login de admin
 *     tags: [Admin]
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
adminRouter.post('/login', loginAsync)

export default adminRouter
