import { Router } from 'express'

import clienteRouter from './cliente.routes'
import fornecedorRouter from './fornecedor.routes'
import pedidoRouter from './pedido.routes'
import plantaRouter from './planta.routes'
import adminRouter from './admin.route'
import nomeCientificoRouter from './nomeCientifico.route'

const mainRouter = Router()

mainRouter.use('/admin', adminRouter)
mainRouter.use('/clientes', clienteRouter)
mainRouter.use('/fornecedores', fornecedorRouter)
mainRouter.use('/pedidos', pedidoRouter)
mainRouter.use('/plantas', plantaRouter)
mainRouter.use('/nomes-cientificos', nomeCientificoRouter)
mainRouter.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: false })
  res.status(200).json({ message: 'Logout deu certo' })
})

export default mainRouter
